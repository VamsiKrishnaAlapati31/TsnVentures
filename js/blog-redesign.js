document.addEventListener('DOMContentLoaded', () => {
  const posts = Array.isArray(window.TSN_BLOG_POSTS) ? window.TSN_BLOG_POSTS : [];
  const grids = document.querySelectorAll('[data-blog-grid]');
  if (posts.length === 0 || grids.length === 0) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

  const renderCard = (post, mode) => {
    const anchorId = escapeHtml(post.anchorId || '');
    const href = mode === 'homepage'
      ? `blog.html#${anchorId}`
      : `#${anchorId}`;

    return `
      <article
        id="${anchorId}"
        class="rdx-align-card blog-post-card"
        data-animated-card
        data-motion-direction="up"
      >
        <div class="rdx-align-card__media">
          <img src="${escapeHtml(post.image || '')}" alt="${escapeHtml(post.alt || post.title || '')}" loading="lazy" decoding="async">
        </div>
        <div class="blog-post-card__body">
          <div class="rdx-align-card__header">
            <div>
              <span class="rdx-align-card__eyebrow">${escapeHtml(post.dateLabel || '')}</span>
              <h3 class="blog-post-card__title">${escapeHtml(post.title || '')}</h3>
            </div>
            <span class="rdx-align-badge ${escapeHtml(post.badgeClass || '')}">${escapeHtml(post.badge || '')}</span>
          </div>
          <p class="blog-post-card__excerpt">${escapeHtml(post.excerpt || '')}</p>
          <div class="rdx-align-card__footer blog-post-card__footer">
            <a href="${href}" class="rdx-align-link">Read More <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </article>
    `;
  };

  grids.forEach((grid) => {
    const mode = grid.getAttribute('data-blog-grid') === 'homepage' ? 'homepage' : 'listing';
    grid.innerHTML = posts.map((post) => renderCard(post, mode)).join('');

    if (window.TsnAnimations && typeof window.TsnAnimations.initAll === 'function') {
      window.TsnAnimations.initAll(grid);
    }
  });
});
