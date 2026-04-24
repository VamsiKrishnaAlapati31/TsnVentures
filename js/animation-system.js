(function attachTsnAnimations() {
  const initialized = {
    section: new WeakSet(),
    heading: new WeakSet(),
    card: new WeakSet(),
    floating: new WeakSet(),
    particle: new WeakSet()
  };

  const reduceMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  let reduceMotion = !!reduceMotionQuery.matches;
  const observers = new WeakMap();

  const toNumber = (value, fallback) => {
    if (value === undefined || value === null || value === '') return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const toBoolean = (value, fallback = false) => {
    if (value === undefined || value === null || value === '') return fallback;
    if (typeof value === 'boolean') return value;
    return value === 'true' || value === '1';
  };

  const datasetValue = (el, key) => {
    if (!el || !el.dataset) return undefined;
    return el.dataset[key];
  };

  const inferDirection = (el, fallback = 'up') => {
    if (!el) return fallback;
    if (el.classList.contains('reveal-left')) return 'left';
    if (el.classList.contains('reveal-right')) return 'right';
    if (el.classList.contains('reveal-scale')) return 'scale';
    return fallback;
  };

  const revealElement = (el) => {
    if (!el) return;
    el.classList.add('tsn-motion-visible', 'revealed');
    el.style.visibility = 'visible';
  };

  const createObserver = (el, once = true) => {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElement(el);
      return null;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        if (once) observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -12% 0px'
    });

    observer.observe(el);
    observers.set(el, observer);
    return observer;
  };

  const ensureMotionTarget = (el, options) => {
    if (!el) return;

    const direction = options.direction || inferDirection(el, 'up');
    el.classList.add('tsn-motion-target', `tsn-motion-${options.type}`);
    el.setAttribute('data-motion-direction', direction);
    el.style.setProperty('--tsn-motion-delay', `${toNumber(options.delay, 0)}ms`);
    el.style.setProperty('--tsn-motion-distance', `${toNumber(options.distance, 28)}px`);
    el.style.setProperty('--tsn-motion-duration', `${toNumber(options.duration, 860)}ms`);
    el.style.setProperty('--tsn-motion-easing', options.easing || 'var(--tsn-ease-out)');
    el.style.visibility = reduceMotion ? 'visible' : 'hidden';

    if (!observers.has(el)) {
      createObserver(el, toBoolean(options.once, true));
    }
  };

  const resolveElements = (root, selector) => {
    if (!root) return [];

    const nodes = [];
    if (root instanceof Element && root.matches(selector)) {
      nodes.push(root);
    }

    if (typeof root.querySelectorAll === 'function') {
      root.querySelectorAll(selector).forEach((node) => nodes.push(node));
    }

    return nodes;
  };

  const resolveChildren = (el, selector) => {
    if (!selector || !el) return [];
    if (selector === 'children') return Array.from(el.children);

    try {
      return Array.from(el.querySelectorAll(selector));
    } catch (error) {
      return [];
    }
  };

  const initChildren = (el, options) => {
    const selector = options.animateChildren || datasetValue(el, 'animateChildren');
    if (!selector) return;

    const children = resolveChildren(el, selector);
    if (children.length === 0) return;

    const stagger = toNumber(options.stagger ?? datasetValue(el, 'stagger'), 90);
    const childType = options.childAnimation || datasetValue(el, 'childAnimation') || 'card';
    const childDirection = options.childDirection || datasetValue(el, 'childDirection') || options.direction || 'up';
    const childDistance = toNumber(options.childDistance ?? datasetValue(el, 'childDistance'), options.distance ?? 28);
    const childDuration = toNumber(options.childDuration ?? datasetValue(el, 'childDuration'), options.duration ?? 860);
    const baseDelay = toNumber(options.childrenDelay ?? datasetValue(el, 'childrenDelay'), 0);

    children.forEach((child, index) => {
      const childOptions = {
        direction: childDirection,
        distance: childDistance,
        duration: childDuration,
        delay: baseDelay + (index * stagger),
        once: options.once
      };

      if (child.hasAttribute('data-animated-heading')) {
        AnimatedHeading(child, childOptions);
        return;
      }

      if (child.hasAttribute('data-animated-card')) {
        AnimatedCard(child, childOptions);
        return;
      }

      if (childType === 'heading') {
        AnimatedHeading(child, childOptions);
        return;
      }

      if (childType === 'section') {
        AnimatedSection(child, childOptions);
        return;
      }

      AnimatedCard(child, childOptions);
    });
  };

  const splitHeadingLines = (el, direction) => {
    if (!el || el.dataset.headingSplit === 'true') return;

    const lines = [];
    let currentLine = [];

    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeName === 'BR') {
        if (currentLine.length > 0) lines.push(currentLine);
        currentLine = [];
        return;
      }

      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
        return;
      }

      currentLine.push(node);
    });

    if (currentLine.length > 0) lines.push(currentLine);
    if (lines.length === 0) return;

    const fragment = document.createDocumentFragment();
    const directionX = direction === 'right' ? '24px' : '-24px';
    const directionY = direction === 'down' ? '-20px' : '18px';

    lines.forEach((lineNodes, index) => {
      const line = document.createElement('span');
      line.className = 'tsn-animated-heading__line';

      const inner = document.createElement('span');
      inner.className = 'tsn-animated-heading__line-inner';
      inner.style.setProperty('--tsn-line-delay', `${index * 140}ms`);
      inner.style.setProperty('--tsn-line-x', directionX);
      inner.style.setProperty('--tsn-line-y', directionY);

      lineNodes.forEach((lineNode) => inner.appendChild(lineNode));
      line.appendChild(inner);
      fragment.appendChild(line);
    });

    el.textContent = '';
    el.appendChild(fragment);
    el.dataset.headingSplit = 'true';
  };

  function AnimatedSection(el, options = {}) {
    if (!el || initialized.section.has(el)) return el;
    initialized.section.add(el);

    const sectionOptions = {
      type: 'section',
      direction: options.direction || datasetValue(el, 'motionDirection') || inferDirection(el, 'up'),
      distance: toNumber(options.distance ?? datasetValue(el, 'motionDistance'), 28),
      duration: toNumber(options.duration ?? datasetValue(el, 'motionDuration'), 860),
      delay: toNumber(options.delay ?? datasetValue(el, 'motionDelay') ?? datasetValue(el, 'delay'), 0),
      easing: options.easing || datasetValue(el, 'motionEasing'),
      once: options.once ?? datasetValue(el, 'motionOnce')
    };

    ensureMotionTarget(el, sectionOptions);
    initChildren(el, options);
    return el;
  }

  function AnimatedHeading(el, options = {}) {
    if (!el || initialized.heading.has(el)) return el;
    initialized.heading.add(el);

    const headingOptions = {
      type: 'heading',
      direction: options.direction || datasetValue(el, 'motionDirection') || inferDirection(el, 'up'),
      distance: toNumber(options.distance ?? datasetValue(el, 'motionDistance'), 30),
      duration: toNumber(options.duration ?? datasetValue(el, 'motionDuration'), 980),
      delay: toNumber(options.delay ?? datasetValue(el, 'motionDelay') ?? datasetValue(el, 'delay'), 0),
      easing: options.easing || datasetValue(el, 'motionEasing'),
      once: options.once ?? datasetValue(el, 'motionOnce')
    };

    splitHeadingLines(el, headingOptions.direction);
    ensureMotionTarget(el, headingOptions);
    return el;
  }

  function AnimatedCard(el, options = {}) {
    if (!el || initialized.card.has(el)) return el;
    initialized.card.add(el);

    const cardOptions = {
      type: 'card',
      direction: options.direction || datasetValue(el, 'motionDirection') || inferDirection(el, 'up'),
      distance: toNumber(options.distance ?? datasetValue(el, 'motionDistance'), 30),
      duration: toNumber(options.duration ?? datasetValue(el, 'motionDuration'), 900),
      delay: toNumber(options.delay ?? datasetValue(el, 'motionDelay') ?? datasetValue(el, 'delay'), 0),
      easing: options.easing || datasetValue(el, 'motionEasing'),
      once: options.once ?? datasetValue(el, 'motionOnce')
    };

    ensureMotionTarget(el, cardOptions);
    initChildren(el, options);
    return el;
  }

  function FloatingElement(el, options = {}) {
    if (!el || initialized.floating.has(el)) return el;
    initialized.floating.add(el);

    const duration = toNumber(options.duration ?? datasetValue(el, 'floatingDuration'), 5200);
    const delay = toNumber(options.delay ?? datasetValue(el, 'floatingDelay'), 0);
    el.classList.add('tsn-floating-element');
    el.style.setProperty('--tsn-floating-duration', `${duration}ms`);
    el.style.setProperty('--tsn-floating-delay', `${delay}ms`);

    if (reduceMotion) {
      el.classList.add('tsn-floating-static');
    }

    return el;
  }

  function ParticleBackground(el, options = {}) {
    if (!el || initialized.particle.has(el) || reduceMotion) return null;
    initialized.particle.add(el);

    const anchor = el.querySelector('[data-particle-anchor], .container, [class*="__container"]');
    const canvas = document.createElement('canvas');
    canvas.className = 'tsn-particle-background';
    canvas.setAttribute('aria-hidden', 'true');

    if (anchor && anchor.parentNode === el) {
      el.insertBefore(canvas, anchor);
    } else {
      el.appendChild(canvas);
    }

    const context = canvas.getContext('2d');
    const particles = [];
    let rafId = 0;
    let active = !document.hidden;
    let width = 0;
    let height = 0;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const maxDots = toNumber(options.count ?? datasetValue(el, 'particleCount'), 44);
    const linkDistance = toNumber(options.linkDistance ?? datasetValue(el, 'particleLinkDistance'), 130);
    const speed = toNumber(options.speed ?? datasetValue(el, 'particleSpeed'), 0.14);

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 1.6 + 1.1
    });

    const resize = () => {
      width = Math.max(el.clientWidth, 320);
      height = Math.max(el.clientHeight, 320);

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const count = Math.min(maxDots, Math.max(16, Math.round((width * height) / 32000)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle());
      }
    };

    const draw = () => {
      if (!active) return;

      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(244, 202, 88, 0.7)';
      context.strokeStyle = 'rgba(161, 214, 255, 0.14)';

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt((dx * dx) + (dy * dy));

          if (distance > linkDistance) continue;

          context.save();
          context.globalAlpha = 1 - (distance / linkDistance);
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
          context.restore();
        }
      }

      rafId = window.requestAnimationFrame(draw);
    };

    const syncVisibility = () => {
      active = !document.hidden;
      if (active && rafId === 0) {
        rafId = window.requestAnimationFrame(draw);
      } else if (!active && rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    resize();
    draw();

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', syncVisibility);
    return canvas;
  }

  function initAll(root = document) {
    resolveElements(root, '[data-particle-background]').forEach((el) => ParticleBackground(el));
    resolveElements(root, '[data-animated-heading]').forEach((el) => AnimatedHeading(el));
    resolveElements(root, '[data-animated-card]').forEach((el) => AnimatedCard(el));

    resolveElements(root, [
      '[data-animated-section]',
      '.reveal:not([data-animated-card]):not([data-animated-heading])',
      '.reveal-left:not([data-animated-card]):not([data-animated-heading])',
      '.reveal-right:not([data-animated-card]):not([data-animated-heading])',
      '.reveal-scale:not([data-animated-card]):not([data-animated-heading])',
      '.stagger-children',
      '.footer'
    ].join(',')).forEach((el) => AnimatedSection(el));

    resolveElements(root, '[data-floating-element]').forEach((el) => FloatingElement(el));
  }

  const handleReducedMotionChange = (event) => {
    reduceMotion = !!event.matches;
    if (reduceMotion) {
      document.querySelectorAll('.tsn-motion-target').forEach((el) => revealElement(el));
    }
  };

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handleReducedMotionChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handleReducedMotionChange);
  }

  window.TsnAnimations = {
    AnimatedSection,
    AnimatedHeading,
    AnimatedCard,
    FloatingElement,
    ParticleBackground,
    initAll
  };
})();
