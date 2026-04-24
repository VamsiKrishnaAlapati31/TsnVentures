/* ========================================
   TSN Ventures — Image Lightbox
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  if (!lightboxOverlay) return;

  const lightboxImg = lightboxOverlay.querySelector('img');
  const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');
  const counterEl = lightboxOverlay.querySelector('[data-lightbox-counter]');

  let galleryImages = [];
  let currentIndex = 0;

  function initLightbox() {
    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    syncControls();
  }

  function syncControls() {
    const hasMultiple = galleryImages.length > 1;

    if (prevBtn) prevBtn.hidden = !hasMultiple;
    if (nextBtn) nextBtn.hidden = !hasMultiple;

    if (counterEl) {
      counterEl.textContent = galleryImages.length > 0
        ? `${currentIndex + 1} / ${galleryImages.length}`
        : '';
    }
  }

  function openLightbox(index) {
    if (galleryImages.length === 0) return;

    currentIndex = Math.max(0, Math.min(index, galleryImages.length - 1));
    const currentItem = galleryImages[currentIndex];
    const src = currentItem.getAttribute('data-lightbox') || currentItem.src;
    const alt = currentItem.getAttribute('data-lightbox-alt')
      || currentItem.getAttribute('aria-label')
      || currentItem.querySelector('img')?.alt
      || 'Gallery Image';

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    syncControls();
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openLightbox(currentIndex);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;

    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    currentIndex = Math.max(galleryImages.indexOf(trigger), 0);
    openLightbox(currentIndex);
  });

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  initLightbox();
  document.addEventListener('tsn:gallery-updated', initLightbox);

});
