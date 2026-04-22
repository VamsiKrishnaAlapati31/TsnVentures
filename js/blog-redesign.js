document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('blogStoriesGrid');
  if (!grid || typeof VENTURES === 'undefined') return;

  const greenCity = VENTURES['green-city'];
  const sunrise = VENTURES['sunrise-layout'];
  if (!greenCity || !sunrise) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

  const renderList = (items) => items.map((item) => (
    `<span><i class="fas fa-check-circle"></i> ${escapeHtml(item)}</span>`
  )).join('');

  const roadLayoutImage = Array.isArray(greenCity.images) && greenCity.images[6]
    ? greenCity.images[6]
    : greenCity.heroImage;

  const posts = [
    {
      eyebrow: 'Dubacherla East',
      badge: greenCity.badge || 'Completed',
      badgeClass: 'rdx-align-badge--green',
      title: 'Green City: A completed layout you can review with confidence',
      image: greenCity.heroImage,
      alt: greenCity.name,
      summary: '8 acres in Dubacherla East with DTCP + RERA approval, completed development, and loan support from SBI, HDFC, and Axis Bank.',
      bullets: [
        'BT paved internal roads',
        'Open drainage system',
        'Clear documentation and water supply'
      ],
      linkLabel: 'View Green City',
      href: `venture-detail.html?id=${encodeURIComponent(greenCity.id)}`
    },
    {
      eyebrow: 'Nallajerlla',
      badge: sunrise.badge || 'Ongoing',
      badgeClass: 'rdx-align-badge--violet',
      title: 'TSN ICONCITY: An ongoing project with loan support',
      image: sunrise.heroImage,
      alt: sunrise.name,
      summary: '10 acres beside Star Grand on TPG Road with RUDA + RERA approval and practical loan options already available.',
      bullets: [
        'HDFC Smart Plot Loans',
        'SBI, BOI, and Bank of Baroda support',
        'Avenue plantation and BT roads'
      ],
      linkLabel: 'View TSN ICONCITY',
      href: `venture-detail.html?id=${encodeURIComponent(sunrise.id)}`
    },
    {
      eyebrow: 'Buyer guide',
      badge: 'Guide',
      badgeClass: 'rdx-align-badge--blue',
      title: 'What to check before you book a plot',
      image: roadLayoutImage,
      alt: 'Layout road plan',
      summary: 'Use Green City and TSN ICONCITY as examples: approvals, roads, open drainage, and a site visit should be clear before you decide.',
      bullets: [
        'Check approvals and supporting documents first',
        'Compare roads, drainage, and water supply',
        'Plan a site visit before booking'
      ],
      linkLabel: 'Plan a Site Visit',
      href: 'index.html#contact'
    }
  ];

  grid.innerHTML = posts.map((post) => `
    <article class="rdx-align-card">
      <div class="rdx-align-card__media">
        <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.alt)}">
      </div>
      <div class="rdx-align-card__header">
        <div>
          <span class="rdx-align-card__eyebrow">${escapeHtml(post.eyebrow)}</span>
          <h3>${escapeHtml(post.title)}</h3>
        </div>
        <span class="rdx-align-badge ${post.badgeClass}">${escapeHtml(post.badge)}</span>
      </div>
      <p>${escapeHtml(post.summary)}</p>
      <div class="rdx-align-list">
        ${renderList(post.bullets)}
      </div>
      <div class="rdx-align-card__footer">
        <a href="${escapeHtml(post.href)}" class="rdx-align-link">${escapeHtml(post.linkLabel)} <i class="fas fa-arrow-right"></i></a>
      </div>
    </article>
  `).join('');
});
