(function attachBlogShared() {
  function translateText(key, fallback) {
    if (window.TSNLanguage && typeof window.TSNLanguage.t === 'function') {
      return window.TSNLanguage.t(key, fallback);
    }

    return fallback || key || '';
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function getCategoryClass(category) {
    return `category-${String(category || '').toLowerCase()}`;
  }

  function createBlogCard(blog) {
    const excerptText = translateText(blog.excerptKey, blog.excerpt || '');

    return `
      <article class="blog-card" data-animated-card data-motion-direction="up">
        <div class="blog-image-wrap blog-img">
          <img src="${escapeHtml(blog.image || '')}" alt="${escapeHtml(blog.alt || blog.title || '')}" class="blog-image" loading="lazy" decoding="async">
        </div>
        <div class="blog-content">
          <div class="blog-meta-row">
            <span class="blog-date">${escapeHtml(blog.date || '')}</span>
            <span class="blog-category ${escapeHtml(getCategoryClass(blog.category))}">${escapeHtml(blog.category || '')}</span>
          </div>
          <h3 class="blog-title">${escapeHtml(blog.title || '')}</h3>
          <p class="blog-excerpt tsn-i18n-copy" data-i18n="${escapeHtml(blog.excerptKey || '')}">${escapeHtml(excerptText)}</p>
          <a href="blog-detail.html?slug=${encodeURIComponent(blog.slug || '')}" class="blog-read-more read-more">
            Read More <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `;
  }

  window.TSNBlogShared = {
    escapeHtml,
    getCategoryClass,
    createBlogCard,
    translateText
  };
})();
