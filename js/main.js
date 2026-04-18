/* ========================================
   TSN Ventures — Site Interactions
   Premium homepage + static pages
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const themeStorageKey = 'tsn-theme';
  const root = document.documentElement;
  const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
  const themeToggleLabels = document.querySelectorAll('[data-theme-toggle-label]');
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  const getStoredTheme = () => {
    try {
      const storedTheme = localStorage.getItem(themeStorageKey);
      return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
    } catch (error) {
      return null;
    }
  };

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;
    return themeMedia.matches ? 'dark' : 'light';
  };

  const syncThemeToggleUi = (theme) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const themeLabel = `${theme.charAt(0).toUpperCase()}${theme.slice(1)} mode`;
    const actionLabel = `Activate ${nextTheme} theme`;

    themeToggleButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', actionLabel);
      button.dataset.themeActive = theme;
      button.title = actionLabel;
    });

    themeToggleLabels.forEach((label) => {
      label.textContent = themeLabel;
    });
  };

  const applyTheme = (theme, options = {}) => {
    const { persist = false } = options;
    root.setAttribute('data-theme', theme);
    syncThemeToggleUi(theme);

    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch (error) {
        /* Local storage might be blocked; ignore and keep the active theme. */
      }
    }
  };

  applyTheme(getPreferredTheme());

  themeToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, { persist: true });
    });
  });

  const onSystemThemeChange = (event) => {
    if (getStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof themeMedia.addEventListener === 'function') {
    themeMedia.addEventListener('change', onSystemThemeChange);
  } else if (typeof themeMedia.addListener === 'function') {
    themeMedia.addListener(onSystemThemeChange);
  }

  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    };
    window.addEventListener('load', () => setTimeout(hidePreloader, 350));
    setTimeout(hidePreloader, 2400);
  }

  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  let lastScrollY = 0;
  let ticking = false;

  function updateNavbar() {
    if (!navbar) return;
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 36);

    if (!prefersReducedMotion && scrollY > 420) {
      if (scrollY > lastScrollY + 10) {
        navbar.style.transform = 'translateY(-100%)';
      } else if (scrollY < lastScrollY - 10) {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
  updateNavbar();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .footer');
  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('revealed'));
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const startCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = prefersReducedMotion ? 0 : 1800;

      if (!duration) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const start = performance.now();
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach(startCounter);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function onAnchorClick(event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight + 4;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer && !prefersReducedMotion) {
    for (let index = 0; index < 26; index += 1) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 80 + 8}%`;
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty('--drift-x', `${Math.random() * 60 - 30}px`);
      particle.style.setProperty('--drift-y', `${-(Math.random() * 120 + 40)}px`);
      particle.style.setProperty('--duration', `${Math.random() * 10 + 7}s`);
      particle.style.setProperty('--delay', `${Math.random() * 5}s`);
      particlesContainer.appendChild(particle);
    }
  }

  const hero = document.querySelector('.hero-premium');
  const parallaxLayers = document.querySelectorAll('.hero-parallax');
  if (hero && !prefersReducedMotion) {
    const glow = document.createElement('div');
    glow.className = 'hero-cursor-glow';
    hero.appendChild(glow);

    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = `${event.clientX - rect.left}px`;
      glow.style.top = `${event.clientY - rect.top}px`;
    });

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight || 900;
      if (scrollY > heroHeight) return;
      parallaxLayers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '0.12');
        layer.style.transform = `translate3d(0, ${scrollY * depth}px, 0)`;
      });
    }, { passive: true });
  }

  const getVentureCategories = (venture) => {
    const categories = ['all'];
    if (venture.status === 'completed') categories.push('completed');
    if (venture.status === 'ongoing') categories.push('ongoing');
    if (venture.status === 'upcoming') categories.push('pre-booking');
    if (['premium-villas', 'heights-phase2'].includes(venture.id)) categories.push('construction');
    return categories;
  };

  const getStatusLabel = (venture) => venture.status === 'upcoming' ? 'Pre-Booking' : (venture.badge || venture.status);

  const getMetaValue = (venture, keyPart) => {
    if (!Array.isArray(venture.stats)) return '—';
    const match = venture.stats.find((item) => (item.label || '').toLowerCase().includes(keyPart));
    return match ? match.value : '—';
  };

  const featuredGrid = document.getElementById('featuredVentureGrid');
  const summaryStrip = document.getElementById('ventureSummaryStrip');
  const filterButtons = document.querySelectorAll('[data-home-filter]');

  function renderSummary(ventures) {
    if (!summaryStrip) return;
    const completed = ventures.filter((item) => item.status === 'completed').length;
    const ongoing = ventures.filter((item) => item.status === 'ongoing').length;
    const preBooking = ventures.filter((item) => item.status === 'upcoming').length;
    const construction = ventures.filter((item) => ['premium-villas', 'heights-phase2'].includes(item.id)).length;

    summaryStrip.innerHTML = `
      <div class="home-discovery-summary__item"><strong>${ventures.length}</strong><span>Total ventures</span></div>
      <div class="home-discovery-summary__item"><strong>${completed}</strong><span>Completed</span></div>
      <div class="home-discovery-summary__item"><strong>${ongoing}</strong><span>Ongoing</span></div>
      <div class="home-discovery-summary__item"><strong>${preBooking}</strong><span>Pre-booking</span></div>
      <div class="home-discovery-summary__item"><strong>${construction}</strong><span>Construction</span></div>
    `;
  }

  function renderHomepageVentures() {
    if (!featuredGrid || typeof VENTURES === 'undefined') return;
    const ventures = Object.values(VENTURES);
    const heroImageFor = (venture) => (typeof getVentureHeroImage === 'function' ? getVentureHeroImage(venture) : venture.heroImage);
    renderSummary(ventures);

    featuredGrid.innerHTML = ventures.map((venture) => {
      const categories = getVentureCategories(venture).join(' ');
      const locationValue = getMetaValue(venture, 'location');
      const scaleValue = getMetaValue(venture, 'area') !== '—' ? getMetaValue(venture, 'area') : getMetaValue(venture, 'size');
      const availabilityValue = getMetaValue(venture, 'plot') !== '—' ? getMetaValue(venture, 'plot') : getMetaValue(venture, 'home');
      const shortDescription = String(venture.description || '').split('\n\n')[0];

      return `
        <article class="home-discovery-card" data-home-categories="${categories}">
          <div class="home-discovery-card__media">
            <img src="${heroImageFor(venture)}" alt="${venture.name}">
            <span class="card-badge ${venture.badgeClass}">${getStatusLabel(venture)}</span>
          </div>
          <div class="home-discovery-card__body">
            <div class="home-discovery-card__tagline">${venture.tagline}</div>
            <h3>${venture.name}</h3>
            <p>${shortDescription}</p>
            <div class="home-discovery-card__meta">
              <div><span>Location</span><strong>${locationValue}</strong></div>
              <div><span>Scale</span><strong>${scaleValue}</strong></div>
              <div><span>Availability</span><strong>${availabilityValue}</strong></div>
            </div>
            <div class="home-discovery-card__footer">
              <a href="venture-detail.html?id=${venture.id}" class="btn btn-primary">View Details</a>
              <a href="${venture.mapLink}" target="_blank" class="home-discovery-card__map"><i class="fas fa-location-arrow"></i> Map</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function activateHomeFilter(filter) {
    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-home-filter') === filter);
    });

    document.querySelectorAll('.home-discovery-card').forEach((card, index) => {
      const categories = (card.getAttribute('data-home-categories') || '').split(' ');
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
  }

  renderHomepageVentures();
  activateHomeFilter('all');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-home-filter') || 'all';
      activateHomeFilter(filter);
      const target = document.getElementById('featured-discovery');
      if (button.classList.contains('hero-quick-chip') && target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight + 4;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });



  document.querySelectorAll('[data-home-filter-jump]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const filter = trigger.getAttribute('data-home-filter-jump') || 'all';
      activateHomeFilter(filter);
      const target = document.getElementById('featured-discovery');
      if (!target) return;
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight + 4;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  if (!prefersReducedMotion) {
    const tiltTargets = document.querySelectorAll('.home-discovery-card, .home-trust-card, .home-trust-flow__item, .hero-stage-card');
    tiltTargets.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const tiltY = (px - 0.5) * 8;
        const tiltX = (0.5 - py) * 8;
        card.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
        card.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--card-tilt-x', '0deg');
        card.style.setProperty('--card-tilt-y', '0deg');
      });
    });
  }

  const venturePageFilterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  const ventureCards = document.querySelectorAll('.venture-card');
  if (venturePageFilterButtons.length > 0 && ventureCards.length > 0) {
    venturePageFilterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        venturePageFilterButtons.forEach((button) => button.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        ventureCards.forEach((card, index) => {
          const visible = filter === 'all' || card.getAttribute('data-category') === filter;
          if (visible) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              card.style.transitionDelay = `${index * 40}ms`;
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(18px)';
            setTimeout(() => { card.style.display = 'none'; }, 220);
          }
        });
      });
    });
  }
});
