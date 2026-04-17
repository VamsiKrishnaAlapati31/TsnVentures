document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('tsn-ventures-redesign')) return;
  if (typeof VENTURES === 'undefined') return;

  const ventures = Object.values(VENTURES);
  const grid = document.getElementById('venturesGrid');
  const summary = document.getElementById('venturesSummary');
  const filterButtons = document.querySelectorAll('[data-venture-filter]');
  const resultCount = document.getElementById('venturesResultCount');

  const totals = {
    total: document.getElementById('venturesTotal'),
    completed: document.getElementById('venturesCompleted'),
    ongoing: document.getElementById('venturesOngoing'),
    prebooking: document.getElementById('venturesPrebooking')
  };

  const isConstruction = (venture) => ['premium-villas', 'heights-phase2'].includes(venture.id);

  const categoriesFor = (venture) => {
    const categories = ['all'];
    if (venture.status === 'completed') categories.push('completed');
    if (venture.status === 'ongoing') categories.push('ongoing');
    if (venture.status === 'upcoming') categories.push('pre-booking');
    if (isConstruction(venture)) categories.push('construction');
    return categories;
  };

  const statusLabel = (venture) => {
    if (isConstruction(venture)) return 'Construction';
    if (venture.status === 'upcoming') return 'Pre-Booking';
    return venture.badge || venture.status;
  };

  const statusClass = (venture) => {
    if (isConstruction(venture)) return 'ventures-rdx-card__badge--construction';
    if (venture.status === 'upcoming') return 'ventures-rdx-card__badge--pre-booking';
    if (venture.status === 'ongoing') return 'ventures-rdx-card__badge--ongoing';
    return 'ventures-rdx-card__badge--completed';
  };

  const statValue = (venture, keyPart) => {
    if (!Array.isArray(venture.stats)) return '—';
    const match = venture.stats.find((item) => (item.label || '').toLowerCase().includes(keyPart));
    return match ? match.value : '—';
  };

  const metricIcon = (label) => {
    if (label === 'Location') return 'fas fa-location-dot';
    if (label === 'Scale') return 'fas fa-expand';
    return 'fas fa-chart-column';
  };

  const renderTotals = () => {
    const completed = ventures.filter((item) => item.status === 'completed').length;
    const ongoing = ventures.filter((item) => item.status === 'ongoing').length;
    const preBooking = ventures.filter((item) => item.status === 'upcoming').length;
    const construction = ventures.filter((item) => isConstruction(item)).length;

    if (totals.total) totals.total.textContent = ventures.length;
    if (totals.completed) totals.completed.textContent = completed;
    if (totals.ongoing) totals.ongoing.textContent = ongoing;
    if (totals.prebooking) totals.prebooking.textContent = preBooking;

    if (summary) {
      summary.innerHTML = [
        `<div class="ventures-rdx-summary-item reveal"><strong>${ventures.length}</strong><span>Total ventures</span></div>`,
        `<div class="ventures-rdx-summary-item reveal"><strong>${completed}</strong><span>Completed</span></div>`,
        `<div class="ventures-rdx-summary-item reveal"><strong>${ongoing}</strong><span>Ongoing</span></div>`,
        `<div class="ventures-rdx-summary-item reveal"><strong>${preBooking}</strong><span>Pre-Booking</span></div>`,
        `<div class="ventures-rdx-summary-item reveal"><strong>${construction}</strong><span>Construction</span></div>`
      ].join('');

      summary.querySelectorAll('.reveal').forEach((item) => item.classList.add('revealed'));
    }
  };

  const renderGrid = () => {
    if (!grid) return;

    grid.innerHTML = ventures.map((venture) => {
      const categories = categoriesFor(venture).join(' ');
      const description = String(venture.description || '').split(/\n\n/)[0];
      const location = statValue(venture, 'location');
      const scale = statValue(venture, 'area') !== '—' ? statValue(venture, 'area') : statValue(venture, 'size');
      const availability = statValue(venture, 'plot') !== '—' ? statValue(venture, 'plot') : statValue(venture, 'home');

      return [
        `<article class="ventures-rdx-card is-visible" data-venture-categories="${categories}">`,
        '  <div class="ventures-rdx-card__header">',
        '    <div class="ventures-rdx-card__headline">',
        `      <span class="ventures-rdx-card__eyebrow">${venture.tagline}</span>`,
        `      <h3>${venture.name}</h3>`,
        '    </div>',
        `    <span class="ventures-rdx-card__badge ${statusClass(venture)}">${statusLabel(venture)}</span>`,
        '  </div>',
        '  <div class="ventures-rdx-card__details">',
        `    <div class="ventures-rdx-card__thumb"><img src="${venture.heroImage}" alt="${venture.name}"></div>`,
        `    <div class="ventures-rdx-card__description">${description}</div>`,
        '  </div>',
        '  <div class="ventures-rdx-card__metrics">',
        `    <div class="ventures-rdx-card__metric"><div class="ventures-rdx-card__metric-icon"><i class="${metricIcon('Location')}"></i></div><span>Location</span><strong>${location}</strong></div>`,
        `    <div class="ventures-rdx-card__metric"><div class="ventures-rdx-card__metric-icon"><i class="${metricIcon('Scale')}"></i></div><span>Scale</span><strong>${scale}</strong></div>`,
        `    <div class="ventures-rdx-card__metric"><div class="ventures-rdx-card__metric-icon"><i class="${metricIcon('Availability')}"></i></div><span>Availability</span><strong>${availability}</strong></div>`,
        '  </div>',
        '  <div class="ventures-rdx-card__footer">',
        `    <a href="venture-detail.html?id=${venture.id}" class="btn btn-primary">View Details</a>`,
        `    <a href="${venture.mapLink}" target="_blank" class="ventures-rdx-card__map"><i class="fas fa-location-arrow"></i> Open Map</a>`,
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  };

  const applyFilter = (filter) => {
    let visibleCount = 0;

    filterButtons.forEach((button) => {
      button.classList.toggle('is-active', button.getAttribute('data-venture-filter') === filter);
    });

    document.querySelectorAll('.ventures-rdx-card').forEach((card) => {
      const categories = (card.getAttribute('data-venture-categories') || '').split(' ');
      const visible = filter === 'all' || categories.includes(filter);
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    if (resultCount) resultCount.textContent = visibleCount;
  };

  renderTotals();
  renderGrid();
  applyFilter('all');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyFilter(button.getAttribute('data-venture-filter') || 'all');
    });
  });
});
