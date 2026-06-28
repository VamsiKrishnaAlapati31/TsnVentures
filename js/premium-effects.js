/* ========================================
   TSN Ventures — Premium Effects Engine
   Lightweight vanilla JS for enhanced UX
   ======================================== */

(function initPremiumEffects() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = !hasHover;

  if (prefersReducedMotion) return;

  /* ============================================
     1. Enhanced 3D Card Tilt (Desktop Only)
     ============================================ */
  function initCardTilt() {
    if (isMobile) return;

    const tiltSelectors = [
      '.home-rdx-feature-row',
      '.home-rdx-trust-card',
      '.home-rdx-trust-step',
      '.home-rdx-stat-card',
      '.home-rdx-point',
      '.home-rdx-flow-card',
      '.tcard',
      '.venture-rdx-stat-item',
      '.venture-rdx-amenity-item',
      '.venture-rdx-gallery-item'
    ].join(',');

    const tiltCards = document.querySelectorAll(tiltSelectors);
    const maxTilt = 6;

    tiltCards.forEach(function (card) {
      if (card.classList.contains('tsn-tilt-card')) return;
      card.classList.add('tsn-tilt-card');

      // Add glow element
      const glow = document.createElement('div');
      glow.className = 'tsn-tilt-glow';
      glow.setAttribute('aria-hidden', 'true');
      card.appendChild(glow);

      let rafId = 0;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      function lerpTilt() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        if (Math.abs(targetX - currentX) < 0.01 && Math.abs(targetY - currentY) < 0.01) {
          currentX = targetX;
          currentY = targetY;
          rafId = 0;
        } else {
          rafId = requestAnimationFrame(lerpTilt);
        }

        var tiltX = (currentY * maxTilt).toFixed(2);
        var tiltY = (currentX * maxTilt).toFixed(2);
        var glowAlpha = Math.min(0.2, Math.sqrt(currentX * currentX + currentY * currentY) * 0.3).toFixed(3);
        var borderAlpha = (0.12 + Math.sqrt(currentX * currentX + currentY * currentY) * 0.15).toFixed(3);

        card.style.setProperty('--tilt-x', tiltX + 'deg');
        card.style.setProperty('--tilt-y', tiltY + 'deg');
        card.style.setProperty('--tilt-glow-opacity', glowAlpha);
        card.style.setProperty('--tilt-glow-x', ((currentX + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--tilt-glow-y', ((currentY + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--tilt-border-alpha', borderAlpha);
      }

      card.addEventListener('mouseenter', function () {
        card.classList.add('tsn-tilt-active');
      });

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) - 0.5;
        targetY = ((e.clientY - rect.top) / rect.height) - 0.5;
        if (!rafId) rafId = requestAnimationFrame(lerpTilt);
      });

      card.addEventListener('mouseleave', function () {
        targetX = 0;
        targetY = 0;
        card.classList.remove('tsn-tilt-active');
        if (!rafId) rafId = requestAnimationFrame(lerpTilt);
      });
    });
  }

  /* ============================================
     2. Button Shine Effect
     ============================================ */
  function initButtonShine() {
    if (isMobile) return;

    var buttons = document.querySelectorAll('.btn-accent, .btn-primary, .btn-outline');
    buttons.forEach(function (btn) {
      if (btn.classList.contains('btn-shine')) return;
      btn.classList.add('btn-shine');
    });
  }

  /* ============================================
     3. Gallery Masonry Stagger
     ============================================ */
  function initGalleryStagger() {
    var galleryItems = document.querySelectorAll('.venture-rdx-gallery-item');
    if (galleryItems.length === 0) return;

    var staggerMs = isMobile ? 40 : 60;

    galleryItems.forEach(function (item, index) {
      if (item.classList.contains('tsn-gallery-stagger')) return;
      item.classList.add('tsn-gallery-stagger');
      item.style.setProperty('--gallery-delay', (index * staggerMs) + 'ms');
    });

    if (!('IntersectionObserver' in window)) {
      galleryItems.forEach(function (item) {
        item.classList.add('tsn-gallery-visible');
      });
      return;
    }

    var galleryObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tsn-gallery-visible');
          galleryObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    galleryItems.forEach(function (item) {
      galleryObserver.observe(item);
    });
  }

  /* ============================================
     4. Glassmorphism Stats Cards
     ============================================ */
  function initGlassStats() {
    var statItems = document.querySelectorAll('.venture-rdx-stat-item');
    statItems.forEach(function (item) {
      if (!item.classList.contains('tsn-glass')) {
        item.classList.add('tsn-glass');
      }
    });
  }

  /* ============================================
     5. Map Iframe Lazy-Load
     ============================================ */
  function initMapLazyLoad() {
    var mapWraps = document.querySelectorAll('.venture-rdx-mapwrap');
    mapWraps.forEach(function (wrap) {
      var iframe = wrap.querySelector('iframe');
      if (!iframe) return;

      var src = iframe.getAttribute('src');
      if (!src) return;

      // Store src and remove it
      iframe.setAttribute('data-src', src);
      iframe.removeAttribute('src');
      wrap.classList.add('tsn-map-skeleton');

      if (!('IntersectionObserver' in window)) {
        iframe.src = src;
        wrap.classList.add('tsn-map-loaded');
        return;
      }

      var mapObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var lazyIframe = entry.target.querySelector('iframe[data-src]');
          if (lazyIframe) {
            lazyIframe.src = lazyIframe.getAttribute('data-src');
            lazyIframe.removeAttribute('data-src');
          }
          entry.target.classList.add('tsn-map-loaded');
          mapObserver.unobserve(entry.target);
        });
      }, { rootMargin: '200px 0px' });

      mapObserver.observe(wrap);
    });
  }

  /* ============================================
     6. Location Pin Pulse
     ============================================ */
  function initPinPulse() {
    var mapWraps = document.querySelectorAll('.venture-rdx-mapwrap');
    mapWraps.forEach(function (wrap) {
      if (wrap.querySelector('.tsn-map-pin-pulse')) return;

      var pin = document.createElement('div');
      pin.className = 'tsn-map-pin-pulse';
      pin.setAttribute('aria-hidden', 'true');
      pin.innerHTML = '<div class="tsn-map-pin-pulse__ring"></div><div class="tsn-map-pin-pulse__ring"></div><div class="tsn-map-pin-pulse__dot"></div>';

      wrap.style.position = 'relative';
      wrap.appendChild(pin);
    });
  }

  /* ============================================
     7. Amenities Smooth Toggle Enhancement
     ============================================ */
  function initAmenitiesSmoothToggle() {
    var grids = document.querySelectorAll('[data-amenities-grid]');
    grids.forEach(function (grid) {
      if (grid.dataset.smoothToggleInit === 'true') return;
      grid.dataset.smoothToggleInit = 'true';

      var toggle = grid.parentElement
        ? grid.parentElement.querySelector('[data-amenities-toggle]')
        : null;
      if (!toggle) return;

      var origClick = toggle.onclick;
      toggle.addEventListener('click', function () {
        var isExpanded = grid.classList.contains('is-expanded');
        if (!isExpanded) {
          grid.style.maxHeight = grid.scrollHeight + 'px';
        } else {
          grid.style.maxHeight = '';
        }
      });
    });
  }

  /* ============================================
     8. Run All Initializers
     ============================================ */
  function initAll() {
    initButtonShine();
    initCardTilt();
    initGalleryStagger();
    initGlassStats();
    initMapLazyLoad();
    initPinPulse();
    initAmenitiesSmoothToggle();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Re-init after dynamic content renders (e.g. venture-detail.js)
  document.addEventListener('tsn:gallery-updated', function () {
    setTimeout(function () {
      initGalleryStagger();
      initGlassStats();
      initMapLazyLoad();
      initPinPulse();
      initCardTilt();
      initButtonShine();
      initAmenitiesSmoothToggle();
    }, 60);
  });

  // Expose for manual triggering
  window.TsnPremium = { initAll: initAll };
})();
