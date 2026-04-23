document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('tsn-ventures-redesign')) return;
  if (typeof VENTURES === 'undefined') return;

  const ventures = Object.values(VENTURES);
  const showcase = document.getElementById('venturesShowcase');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const failedSources = new Set();
  const imageProbeCache = new Map();

  const heroImageFor = (venture) => (typeof getVentureHeroImage === 'function' ? getVentureHeroImage(venture) : venture.heroImage);

  const ventureImagesFor = (venture) => {
    const images = typeof getVentureImages === 'function' ? getVentureImages(venture) : [];
    const cleaned = Array.isArray(images) ? images.filter(Boolean) : [];
    if (cleaned.length > 0) return cleaned;

    const heroImage = heroImageFor(venture);
    return heroImage ? [heroImage] : [];
  };

  const stageLabel = (venture) => {
    if (venture.status === 'completed') return 'Completed Venture';
    if (venture.status === 'ongoing') return 'Ongoing Venture';
    return 'Pre-Booking Venture';
  };

  const metricIcon = (label) => {
    if (label === 'Location') return 'fas fa-location-dot';
    if (label === 'Scale') return 'fas fa-expand';
    return 'fas fa-chart-column';
  };

  const firstParagraph = (text) => String(text || '')
    .trim()
    .split(/\n\n+/)[0]
    .replace(/\s+/g, ' ')
    .trim();

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const fallbackSourcesFor = (venture) => [heroImageFor(venture), 'assets/images/hero-banner.png'].filter(Boolean);

  const probeImage = (src) => {
    if (!src) return Promise.resolve(false);
    if (imageProbeCache.has(src)) return imageProbeCache.get(src);

    const promise = new Promise((resolve) => {
      const image = new Image();
      let settled = false;

      const finish = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };

      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = src;

      if (typeof image.decode === 'function') {
        image.decode().then(() => finish(true)).catch(() => finish(false));
      }
    });

    imageProbeCache.set(src, promise);
    return promise;
  };

  const markBrokenSource = (venture, src) => {
    if (!src || failedSources.has(src)) return;
    failedSources.add(src);

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(`[ventures] Skipping broken image for ${venture.id}: ${src}`);
    }
  };

  const findNextValidImage = async (venture, sources, startIndex = 0) => {
    const orderedSources = Array.isArray(sources) && sources.length > 0 ? sources : fallbackSourcesFor(venture);

    for (let offset = 0; offset < orderedSources.length; offset += 1) {
      const index = (startIndex + offset) % orderedSources.length;
      const src = orderedSources[index];
      if (!src || failedSources.has(src)) continue;

      if (await probeImage(src)) {
        return { src, index };
      }

      markBrokenSource(venture, src);
    }

    const fallbacks = fallbackSourcesFor(venture);
    for (let index = 0; index < fallbacks.length; index += 1) {
      const src = fallbacks[index];
      if (!src || failedSources.has(src)) continue;

      if (await probeImage(src)) {
        return { src, index: orderedSources.length + index };
      }

      markBrokenSource(venture, src);
    }

    return null;
  };

  const revealNodes = (root, selector, staggerMs = 120) => {
    if (!root) return;
    const nodes = root.querySelectorAll(selector);
    if (nodes.length === 0) return;

    if (prefersReducedMotion) {
      nodes.forEach((node) => node.classList.add('revealed'));
      return;
    }

    window.requestAnimationFrame(() => {
      nodes.forEach((node, index) => {
        window.setTimeout(() => node.classList.add('revealed'), index * staggerMs);
      });
    });
  };

  const setupFeatureCarousel = (row, venture) => {
    const currentSlide = row.querySelector('[data-slide="current"]');
    const bufferSlide = row.querySelector('[data-slide="buffer"]');
    const gallery = row.querySelector('[data-gallery]');
    const images = ventureImagesFor(venture);
    const slides = Array.from(new Set(images.length > 0 ? images : [heroImageFor(venture)].filter(Boolean)));

    if (!currentSlide || slides.length === 0) return;

    const setSlide = (slide, src, index) => {
      if (!slide || !src) return;
      slide.src = src;
      slide.alt = `${venture.name} image ${index + 1} of ${slides.length}`;
    };

    let activeSlide = currentSlide;
    let inactiveSlide = bufferSlide;
    let activeIndex = 0;
    let cancelled = false;
    const cycleMs = 3600;
    const fadeMs = 900;

    const abortIfCancelled = () => cancelled || !document.body.contains(row);

    const finishStatic = () => {
      if (bufferSlide) bufferSlide.remove();
      if (gallery) gallery.classList.add('ventures-rdx-feature-row__slides--static');
    };

    const bootstrap = async () => {
      const initial = await findNextValidImage(venture, slides, 0);
      if (abortIfCancelled()) return;
      if (!initial) {
        finishStatic();
        return;
      }

      setSlide(currentSlide, initial.src, initial.index % slides.length);
      currentSlide.classList.add('is-visible');
      activeIndex = initial.index % slides.length;

      if (slides.length === 1 || prefersReducedMotion || !bufferSlide) {
        finishStatic();
        return;
      }

      const next = await findNextValidImage(venture, slides, (activeIndex + 1) % slides.length);
      if (!abortIfCancelled() && next) {
        setSlide(bufferSlide, next.src, next.index % slides.length);
      }

      while (!abortIfCancelled()) {
        await wait(cycleMs);
        if (abortIfCancelled()) break;

        const upcoming = await findNextValidImage(venture, slides, (activeIndex + 1) % slides.length);
        if (abortIfCancelled()) break;
        if (!upcoming) {
          finishStatic();
          break;
        }

        setSlide(inactiveSlide, upcoming.src, upcoming.index % slides.length);
        inactiveSlide.classList.add('is-visible');
        activeSlide.classList.remove('is-visible');

        await wait(fadeMs);
        if (abortIfCancelled()) break;

        const previousActive = activeSlide;
        activeSlide = inactiveSlide;
        inactiveSlide = previousActive;
        activeIndex = upcoming.index % slides.length;

        if (inactiveSlide) {
          const preloadIndex = (activeIndex + 1) % slides.length;
          const preloadSource = await findNextValidImage(venture, slides, preloadIndex);
          if (abortIfCancelled()) break;
          if (preloadSource) {
            setSlide(inactiveSlide, preloadSource.src, preloadSource.index % slides.length);
          }
        }
      }
    };

    const handleSlideError = async (slide) => {
      if (cancelled || !slide) return;
      const replacement = await findNextValidImage(venture, slides, (activeIndex + 1) % slides.length);
      if (cancelled) return;
      if (!replacement) {
        finishStatic();
        return;
      }

      setSlide(slide, replacement.src, replacement.index % slides.length);
      if (slide === activeSlide) {
        slide.classList.add('is-visible');
      }
    };

    currentSlide.onerror = () => { void handleSlideError(currentSlide); };

    if (bufferSlide) {
      bufferSlide.onerror = () => { void handleSlideError(bufferSlide); };
    }

    bootstrap();
  };

  const renderShowcase = () => {
    if (!showcase) return;

    showcase.innerHTML = ventures.map((venture, index) => {
      const images = ventureImagesFor(venture);
      const firstImage = images[0] || heroImageFor(venture) || 'assets/images/hero-banner.png';
      const imageCount = images.length > 0 ? images.length : 1;
      const description = firstParagraph(venture.description);
      const stats = Array.isArray(venture.stats) ? venture.stats.slice(0, 3) : [];
      const reverse = index % 2 === 1;
      const rowClasses = [
        'ventures-rdx-feature-row',
        reverse ? 'ventures-rdx-feature-row--reverse' : '',
        reverse ? 'reveal-right' : 'reveal-left'
      ].filter(Boolean).join(' ');

      return `
        <article class="${rowClasses}" data-venture-id="${venture.id}">
          <div class="ventures-rdx-feature-row__media">
            <div class="ventures-rdx-feature-row__slides" data-gallery>
              <img class="ventures-rdx-feature-row__slide ventures-rdx-feature-row__slide--current is-visible" data-slide="current" src="${firstImage}" alt="${venture.name} image 1 of ${imageCount}" loading="eager" decoding="async">
              <img class="ventures-rdx-feature-row__slide ventures-rdx-feature-row__slide--buffer" data-slide="buffer" alt="" loading="eager" decoding="async">
            </div>
            <div class="ventures-rdx-feature-row__overlay"></div>
            <div class="ventures-rdx-feature-row__badge">Auto gallery · ${imageCount} images</div>
          </div>
          <div class="ventures-rdx-feature-row__content">
            <div class="ventures-rdx-feature-row__eyebrow">${stageLabel(venture)}</div>
            <h3>${venture.name}</h3>
            <p class="ventures-rdx-feature-row__tagline">${venture.tagline}</p>
            <p class="ventures-rdx-feature-row__description">${description}</p>
            <div class="ventures-rdx-feature-row__stats">
              ${stats.map((stat) => `
                <div class="ventures-rdx-feature-row__stat">
                  <i class="${stat.icon || metricIcon(stat.label)}"></i>
                  <strong>${stat.value}</strong>
                  <span>${stat.label}</span>
                </div>
              `).join('')}
            </div>
            <div class="ventures-rdx-feature-row__actions">
              <a href="venture-detail.html?id=${venture.id}" class="btn btn-accent">View Details</a>
              <a href="${venture.mapLink}" target="_blank" rel="noreferrer" class="btn btn-outline">Open Map</a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    revealNodes(showcase, '.reveal-left, .reveal-right', 140);

    showcase.querySelectorAll('.ventures-rdx-feature-row').forEach((row) => {
      const ventureId = row.getAttribute('data-venture-id');
      const venture = ventures.find((item) => item.id === ventureId);
      if (venture) setupFeatureCarousel(row, venture);
    });
  };

  renderShowcase();
});
