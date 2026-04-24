(function attachVentureDetailPage() {
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function buildWhatsappHref(venture) {
    const waMsg = encodeURIComponent(
      `Hi TSN Ventures! I am interested in ${venture.name} (${venture.location}). Please share details on plot availability and pricing.`
    );
    return `https://wa.me/919553577777?text=${waMsg}`;
  }

  function renderDescription(description) {
    return String(description || '')
      .split('\n\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join('');
  }

  function renderVentureAboutSection(venture) {
    return `
      <article class="venture-rdx-card venture-rdx-copy reveal" data-animated-card data-motion-direction="up">
        <div class="section-label">About This Venture</div>
        <h2 data-animated-heading>Built for clearer buyer confidence</h2>
        <div class="venture-rdx-copy__content">
          ${renderDescription(venture.description)}
        </div>
      </article>
    `;
  }

  function renderVentureAmenitiesSection(venture) {
    const amenities = Array.isArray(venture.amenities) ? venture.amenities : [];

    return `
      <article class="venture-rdx-card reveal" data-animated-card data-motion-direction="up">
        <div class="section-label">Amenities & Features</div>
        <h2 data-animated-heading>Infrastructure and lifestyle cues</h2>
        <div class="venture-rdx-amenities" data-animated-section data-animate-children="children" data-child-animation="card" data-child-direction="up" data-stagger="80">
          ${amenities.map((amenity) => `
            <div class="venture-rdx-amenity-item" data-animated-card data-motion-direction="up">
              <div class="venture-rdx-amenity-icon"><i class="${escapeHtml(amenity.icon || 'fas fa-star')}"></i></div>
              <span>${escapeHtml(amenity.text || '')}</span>
            </div>
          `).join('')}
        </div>
      </article>
    `;
  }

  function renderVentureStatsCards(venture) {
    const stats = Array.isArray(venture.stats) ? venture.stats : [];

    return `
      <section class="venture-rdx-stats-section reveal" data-animated-section data-animate-children="children" data-child-animation="card" data-child-direction="up" data-stagger="80">
        ${stats.map((stat) => `
          <article class="venture-rdx-stat-item" data-animated-card data-motion-direction="up">
            <div class="venture-rdx-stat-icon"><i class="${escapeHtml(stat.icon || 'fas fa-star')}"></i></div>
            <div class="venture-rdx-stat-value">${escapeHtml(stat.value || '')}</div>
            <div class="venture-rdx-stat-label">${escapeHtml(stat.label || '')}</div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderVenturePhotoGallery(venture, images) {
    if (!images.length) {
      return `
        <article class="venture-rdx-card venture-rdx-gallery-card reveal" data-animated-card data-motion-direction="up">
          <div class="venture-rdx-sectionhead">
            <div>
              <div class="section-label">Photo Gallery</div>
              <h2 data-animated-heading>Real project visuals</h2>
            </div>
            <p>Project images will appear here soon.</p>
          </div>
          <p class="venture-rdx-gallery-empty">Gallery images will appear here soon.</p>
        </article>
      `;
    }

    return `
      <article class="venture-rdx-card venture-rdx-gallery-card reveal" data-animated-card data-motion-direction="up">
        <div class="venture-rdx-sectionhead">
          <div>
            <div class="section-label">Photo Gallery</div>
            <h2 data-animated-heading>Real project visuals</h2>
          </div>
          <p>Browse all project photos together and open any image in a larger preview.</p>
        </div>
        <div class="venture-rdx-gallery-grid" data-animated-section data-animate-children="children" data-child-animation="card" data-child-direction="scale" data-stagger="40">
          ${images.map((src, index) => `
            <button
              type="button"
              class="venture-rdx-gallery-item"
              data-lightbox="${escapeHtml(src)}"
              data-lightbox-alt="${escapeHtml(`${venture.name} - Photo ${index + 1}`)}"
              data-animated-card
              data-motion-direction="scale"
            >
              <img src="${escapeHtml(src)}" alt="${escapeHtml(`${venture.name} - Photo ${index + 1}`)}" loading="lazy" decoding="async">
              <span class="venture-rdx-gallery-item__overlay"><i class="fas fa-expand-alt"></i> View Photo</span>
            </button>
          `).join('')}
        </div>
      </article>
    `;
  }

  function renderVentureLocationSection(venture) {
    const fallbackMapSrc = `https://maps.google.com/maps?q=${venture.mapQuery}&output=embed&z=14`;
    const isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    const mapSrc = isLocalHost ? fallbackMapSrc : (venture.mapEmbed || fallbackMapSrc);

    return `
      <article class="venture-rdx-card venture-rdx-location-card reveal" data-animated-card data-motion-direction="up">
        <div class="section-label">Location</div>
        <div class="venture-rdx-bottomhead">
          <div>
            <h2 data-animated-heading>Map and address</h2>
            <p class="venture-rdx-location">${escapeHtml(venture.location || '')}</p>
          </div>
          <a href="${escapeHtml(venture.mapLink || '#')}" target="_blank" class="btn btn-primary"><i class="fas fa-location-arrow"></i> Open in Google Maps</a>
        </div>
        <div class="venture-rdx-mapwrap">
          <iframe src="${escapeHtml(mapSrc)}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </article>
    `;
  }

  function renderVentureEnquirySection(venture) {
    return `
      <article class="venture-rdx-card venture-rdx-enquiry-card reveal" data-animated-card data-motion-direction="up">
        <div class="section-label">Enquiry Path</div>
        <div class="venture-rdx-bottomhead venture-rdx-bottomhead--stacked">
          <div>
            <h2 data-animated-heading>Interested in this venture?</h2>
            <p>Ask for pricing, plot availability, construction timelines, or schedule a site visit directly from here.</p>
          </div>
        </div>
        <div class="venture-rdx-enquiry-actions">
          <a href="${escapeHtml(buildWhatsappHref(venture))}" target="_blank" class="btn btn-accent"><i class="fab fa-whatsapp"></i> Enquire on WhatsApp</a>
          <a href="index.html#contact" class="btn btn-outline"><i class="fas fa-paper-plane"></i> Send Message</a>
        </div>
      </article>
    `;
  }

  function getResolvedImages(venture) {
    const galleryImages = typeof getVentureImages === 'function'
      ? getVentureImages(venture)
      : (Array.isArray(venture.images) ? venture.images : []);

    const cleaned = Array.from(new Set((galleryImages || []).filter(Boolean)));
    if (cleaned.length > 0) return cleaned;

    const heroImage = typeof getVentureHeroImage === 'function'
      ? getVentureHeroImage(venture)
      : venture.heroImage;

    return heroImage ? [heroImage] : [];
  }

  function renderVentureDetail(venture) {
    const mount = document.getElementById('ventureDetailSections');
    if (!mount) return;

    const images = getResolvedImages(venture);

    mount.innerHTML = [
      renderVentureAboutSection(venture),
      renderVentureAmenitiesSection(venture),
      renderVentureStatsCards(venture),
      renderVenturePhotoGallery(venture, images),
      renderVentureLocationSection(venture),
      renderVentureEnquirySection(venture)
    ].join('');

    if (window.TsnAnimations && typeof window.TsnAnimations.initAll === 'function') {
      window.TsnAnimations.initAll(mount);
    }

    document.dispatchEvent(new CustomEvent('tsn:gallery-updated'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');

    if (requestedId === 'green-valley') {
      params.set('id', 'green-city');
      window.location.replace(`${window.location.pathname}?${params.toString()}`);
      return;
    }

    const venture = VENTURES[requestedId];
    if (!venture) {
      window.location.href = 'ventures.html';
      return;
    }

    document.title = `${venture.name} — TSN Ventures`;
    renderVentureDetail(venture);
  });
})();
