document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blogDetail');
  const posts = Array.isArray(window.projectUpdates) ? window.projectUpdates : [];
  const renderer = window.TSNBlogShared;

  if (!container || posts.length === 0 || !renderer || typeof renderer.escapeHtml !== 'function') return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const blog = posts.find((item) => item.slug === slug);

  if (!blog) {
    document.title = 'Blog Not Found | TSN Ventures';
    container.innerHTML = `
      <div class="blog-detail-empty">
        <h1>Blog not found</h1>
        <p>The blog you are looking for is not available.</p>
        <a href="blog.html" class="back-to-blog">← Back to Blog</a>
      </div>
    `;
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
      ${String(blog.content || '')}
    </div>
    <a href="blog.html" class="back-to-blog reveal" data-animated-section data-motion-direction="up">← Back to Blog</a>
  `;

  if (window.TsnAnimations && typeof window.TsnAnimations.initAll === 'function') {
    window.TsnAnimations.initAll(container);
  }
});
