/* ========================================
   TSN Ventures — Image Lightbox
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  if (!lightboxOverlay) return;

  const lightboxImg = lightboxOverlay.querySelector('img');
  const lightboxFigure = lightboxOverlay.querySelector('.lightbox-figure');
  const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');
  const counterEl = lightboxOverlay.querySelector('[data-lightbox-counter]');
  const swipeThreshold = 48;
  const swipeBias = 1.2;

  let galleryImages = [];
  let currentIndex = 0;
  let transitionTimer = 0;
  let touchState = null;

  function initLightbox() {
    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    currentIndex = clampIndex(currentIndex);
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

  function clampIndex(index) {
    return Math.max(0, Math.min(index, galleryImages.length - 1));
  }

  function renderLightboxImage({ animate = false } = {}) {
    if (galleryImages.length === 0) return;

    const currentItem = galleryImages[currentIndex];
    const src = currentItem.getAttribute('data-lightbox') || currentItem.src;
    const alt = currentItem.getAttribute('data-lightbox-alt')
      || currentItem.getAttribute('aria-label')
      || currentItem.querySelector('img')?.alt
      || 'Gallery Image';

    window.clearTimeout(transitionTimer);
    if (animate) {
      lightboxImg.classList.add('is-changing');
      transitionTimer = window.setTimeout(() => {
        lightboxImg.classList.remove('is-changing');
      }, 220);
    } else {
      lightboxImg.classList.remove('is-changing');
    }

    lightboxImg.src = src;
    lightboxImg.alt = alt;
    syncControls();
  }

  function openLightbox(index) {
    if (galleryImages.length === 0) return;

    currentIndex = clampIndex(index);
    renderLightboxImage();
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
    window.clearTimeout(transitionTimer);
    lightboxImg.classList.remove('is-changing');
    resetTouchState();
  }

  function showPrev() {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    renderLightboxImage({ animate: true });
  }

  function showNext() {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    renderLightboxImage({ animate: true });
  }

  function resetTouchState() {
    touchState = null;
  }

  function handleTouchStart(event) {
    if (!lightboxOverlay.classList.contains('active') || event.touches.length !== 1) {
      resetTouchState();
      return;
    }

    const touch = event.touches[0];
    touchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      deltaY: 0
    };
  }

  function handleTouchMove(event) {
    if (!touchState || event.touches.length !== 1) return;

    const touch = event.touches[0];
    touchState.deltaX = touch.clientX - touchState.startX;
    touchState.deltaY = touch.clientY - touchState.startY;

    if (Math.abs(touchState.deltaX) > Math.abs(touchState.deltaY) && Math.abs(touchState.deltaX) > 8) {
      event.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!touchState) return;

    const { deltaX, deltaY } = touchState;
    const isIntentionalSwipe = Math.abs(deltaX) >= swipeThreshold
      && Math.abs(deltaX) > Math.abs(deltaY) * swipeBias;

    resetTouchState();

    if (!isIntentionalSwipe) return;

    if (deltaX < 0) {
      showNext();
    } else {
      showPrev();
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  if (lightboxFigure) {
    lightboxFigure.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightboxFigure.addEventListener('touchmove', handleTouchMove, { passive: false });
    lightboxFigure.addEventListener('touchend', handleTouchEnd, { passive: true });
    lightboxFigure.addEventListener('touchcancel', resetTouchState, { passive: true });
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;

    galleryImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    currentIndex = clampIndex(galleryImages.indexOf(trigger));
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
