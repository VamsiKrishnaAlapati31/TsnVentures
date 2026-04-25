(function attachBlogShared() {
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
          <p class="blog-excerpt">${escapeHtml(blog.excerpt || '')}</p>
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
    createBlogCard
  };
})();
