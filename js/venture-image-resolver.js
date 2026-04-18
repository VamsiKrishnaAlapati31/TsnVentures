(function attachVentureImageResolver(global) {
  function manifestImagesFor(venture) {
    if (!venture || !venture.id || typeof global.VENTURE_IMAGE_MANIFEST === 'undefined') return [];
    const images = global.VENTURE_IMAGE_MANIFEST[venture.id];
    return Array.isArray(images) ? images.filter(Boolean) : [];
  }

  function fallbackImagesFor(venture) {
    return Array.isArray(venture && venture.images) ? venture.images.filter(Boolean) : [];
  }

  function getVentureImages(venture) {
    const manifestImages = manifestImagesFor(venture);
    if (manifestImages.length > 0) return manifestImages;
    return fallbackImagesFor(venture);
  }

  function getVentureHeroImage(venture) {
    const manifestImages = manifestImagesFor(venture);
    if (manifestImages.length > 0) return manifestImages[0];
    return (venture && venture.heroImage) || fallbackImagesFor(venture)[0] || 'assets/images/hero-banner.png';
  }

  global.getVentureImages = getVentureImages;
  global.getVentureHeroImage = getVentureHeroImage;
})(window);
