document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blogDetail');
  const posts = Array.isArray(window.projectUpdates) ? window.projectUpdates : [];
  const renderer = window.TSNBlogShared;
  const language = window.TSNLanguage;

  if (!container || posts.length === 0 || !renderer || typeof renderer.escapeHtml !== 'function') return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const blog = posts.find((item) => item.slug === slug);

  const translate = (key, fallback) => (
    language && typeof language.t === 'function'
      ? language.t(key, fallback)
      : (fallback || key)
  );

  const renderBody = (body) => {
    const blocks = Array.isArray(body) ? body : [];

    return blocks.map((block) => {
      if (!block || typeof block !== 'object') return '';

      if (block.type === 'heading') {
        const level = [1, 2, 3, 4, 5, 6].includes(block.level) ? block.level : 3;
        return `<h${level} lang="en">${renderer.escapeHtml(block.text || '')}</h${level}>`;
      }

      if (block.type === 'list') {
        const items = Array.isArray(block.items) ? block.items : [];
        return `
          <ul>
            ${items.map((itemKey) => {
              const value = translate(itemKey, itemKey);
              return `<li class="tsn-i18n-copy" data-i18n="${renderer.escapeHtml(itemKey)}">${renderer.escapeHtml(value)}</li>`;
            }).join('')}
          </ul>
        `;
      }

      if (block.type === 'p' && block.key) {
        const value = translate(block.key, block.key);
        return `<p class="tsn-i18n-copy" data-i18n="${renderer.escapeHtml(block.key)}">${renderer.escapeHtml(value)}</p>`;
      }

      return '';
    }).join('');
  };

  if (!blog) {
    document.title = 'Blog Not Found | TSN Ventures';
    container.innerHTML = `
      <div class="blog-detail-empty">
        <h1>Blog not found</h1>
        <p class="tsn-i18n-copy" data-i18n="shared.blog.notFound.body">${renderer.escapeHtml(translate('shared.blog.notFound.body', 'The blog you are looking for is not available.'))}</p>
        <a href="blog.html" class="back-to-blog">← Back to Blog</a>
      </div>
    `;
    if (language && typeof language.applyTranslations === 'function') {
      language.applyTranslations(container);
    }
    return;
  }

  document.title = `${blog.title} | TSN Ventures`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', blog.excerpt);
  }

  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  container.innerHTML = `
    <div class="blog-detail-hero reveal" data-animated-section data-motion-direction="up">
      <span class="section-label">${renderer.escapeHtml(blog.category || '')}</span>
      <h1 data-animated-heading>${renderer.escapeHtml(blog.title || '')}</h1>
      <div class="blog-detail-meta">
        <span>${renderer.escapeHtml(blog.date || '')}</span>
        <span aria-hidden="true">•</span>
        <span>${renderer.escapeHtml(blog.readTime || '')}</span>
      </div>
      ${tags.length > 0 ? `<div class="blog-detail-tags">${tags.map((tag) => `<span>${renderer.escapeHtml(tag)}</span>`).join('')}</div>` : ''}
      <img src="${renderer.escapeHtml(blog.image || '')}" alt="${renderer.escapeHtml(blog.alt || blog.title || '')}" class="blog-detail-image">
    </div>
    <div class="blog-detail-content reveal" data-animated-section data-motion-direction="up">
      ${renderBody(blog.body)}
    </div>
    <a href="blog.html" class="back-to-blog reveal" data-animated-section data-motion-direction="up">← Back to Blog</a>
  `;

  if (language && typeof language.applyTranslations === 'function') {
    language.applyTranslations(container);
  }

  if (window.TsnAnimations && typeof window.TsnAnimations.initAll === 'function') {
    window.TsnAnimations.initAll(container);
  }
});
