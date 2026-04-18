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

  let galleryImages = [];
  let currentIndex = 0;

  function initLightbox() {
    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const src = galleryImages[currentIndex].getAttribute('data-lightbox') || galleryImages[currentIndex].src;
    lightboxImg.src = src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const src = galleryImages[currentIndex].getAttribute('data-lightbox') || galleryImages[currentIndex].src;
    lightboxImg.src = src;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;

    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    currentIndex = Math.max(galleryImages.indexOf(trigger), 0);
    openLightbox(trigger.getAttribute('data-lightbox') || trigger.src);
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
