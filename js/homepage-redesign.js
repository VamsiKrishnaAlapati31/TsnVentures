document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('tsn-home-redesign')) return;
  if (typeof VENTURES === 'undefined') return;

  const grid = document.getElementById('rdxGrid');
  const filterButtons = document.querySelectorAll('[data-rdx-filter]');
  const jumpButtons = document.querySelectorAll('[data-rdx-jump]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ventures = Object.values(VENTURES);
  const heroImageFor = (venture) => (typeof getVentureHeroImage === 'function' ? getVentureHeroImage(venture) : venture.heroImage);

  const categoriesFor = (venture) => {
    const categories = ['all'];
    if (venture.status === 'completed') categories.push('completed');
    if (venture.status === 'ongoing') categories.push('ongoing');
    if (venture.status === 'upcoming') categories.push('pre-booking');
    if (['premium-villas', 'heights-phase2'].includes(venture.id)) categories.push('construction');
    return categories;
  };

  const statusLabel = (venture) => {
    if (['premium-villas', 'heights-phase2'].includes(venture.id)) return 'Construction';
    if (venture.status === 'upcoming') return 'Pre-Booking';
    return venture.badge || venture.status;
  };

  const statusClass = (venture) => {
    if (['premium-villas', 'heights-phase2'].includes(venture.id)) return 'home-rdx-badge--construction';
    if (venture.status === 'upcoming') return 'home-rdx-badge--pre-booking';
    if (venture.status === 'ongoing') return 'home-rdx-badge--ongoing';
    return 'home-rdx-badge--completed';
  };

  const statValue = (venture, keyPart) => {
    if (!Array.isArray(venture.stats)) return '—';
    const match = venture.stats.find((item) => (item.label || '').toLowerCase().includes(keyPart));
    return match ? match.value : '—';
  };

  const renderGrid = () => {
    if (!grid) return;
    grid.innerHTML = ventures.map((venture) => {
      const categories = categoriesFor(venture).join(' ');
      const location = statValue(venture, 'location');
      const scale = statValue(venture, 'area') !== '—' ? statValue(venture, 'area') : statValue(venture, 'size');
      const availability = statValue(venture, 'plot') !== '—' ? statValue(venture, 'plot') : statValue(venture, 'home');
      const description = String(venture.description || '').split(/\n\n/)[0];

      return [
        `<article class="home-rdx-card reveal-scale" data-rdx-categories="${categories}">`,
        '  <div class="home-rdx-card__media">',
        `    <img src="${heroImageFor(venture)}" alt="${venture.name}">`,
        `    <span class="home-rdx-badge ${statusClass(venture)}">${statusLabel(venture)}</span>`,
        '  </div>',
        '  <div class="home-rdx-card__body">',
        `    <div class="home-rdx-card__eyebrow">${venture.tagline}</div>`,
        `    <h3>${venture.name}</h3>`,
        `    <p>${description}</p>`,
        '    <div class="home-rdx-card__meta">',
        `      <div><span>Location</span><strong>${location}</strong></div>`,
        `      <div><span>Scale</span><strong>${scale}</strong></div>`,
        `      <div><span>Availability</span><strong>${availability}</strong></div>`,
        '    </div>',
        '    <div class="home-rdx-card__footer">',
        `      <a href="venture-detail.html?id=${venture.id}" class="btn btn-primary">View Details</a>`,
        `      <a href="${venture.mapLink}" target="_blank" class="home-rdx-card__map"><i class="fas fa-location-arrow"></i> Open Map</a>`,
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  };

  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-rdx-filter') === filter);
    });

    document.querySelectorAll('.home-rdx-card').forEach((card, index) => {
      const categories = (card.getAttribute('data-rdx-categories') || '').split(' ');
      const visible = filter === 'all' || categories.includes(filter);

      if (visible) {
        card.style.display = '';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.transitionDelay = `${index * 45}ms`;
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(18px)';
        card.style.transitionDelay = '0ms';
        setTimeout(() => {
          if (card.style.opacity === '0') card.style.display = 'none';
        }, 220);
      }
    });
  };

  renderGrid();
  applyFilter('all');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-rdx-filter') || 'all';
      applyFilter(filter);
      const target = document.getElementById('rdx-discovery');
      if (button.closest('.home-rdx-filter-strip__chips') && target) {
        const navbar = document.getElementById('navbar');
        const offset = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset + 6;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  jumpButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const filter = button.getAttribute('data-rdx-jump') || 'all';
      applyFilter(filter);
      const target = document.getElementById('rdx-discovery');
      const navbar = document.getElementById('navbar');
      const offset = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 6;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  if (!prefersReducedMotion) {
    const hero = document.querySelector('.home-rdx-hero');
    if (hero) {
      hero.addEventListener('mousemove', (event) => {
        const rect = hero.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) - 0.5;
        const py = ((event.clientY - rect.top) / rect.height) - 0.5;
        hero.style.setProperty('--rdx-pointer-x', `${(px * 24).toFixed(2)}px`);
        hero.style.setProperty('--rdx-pointer-y', `${(py * 24).toFixed(2)}px`);
      });
    }
  }
});
