document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('homeProjectUpdates');
  const posts = Array.isArray(window.projectUpdates) ? window.projectUpdates : [];
  const renderer = window.TSNBlogShared;

  if (!container || posts.length === 0 || !renderer || typeof renderer.createBlogCard !== 'function') return;

  container.innerHTML = posts.slice(0, 3).map((post) => renderer.createBlogCard(post)).join('');

  if (window.TsnAnimations && typeof window.TsnAnimations.initAll === 'function') {
    window.TsnAnimations.initAll(container);
  }
});
