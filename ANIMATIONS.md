# TSN Animation Guide

This project uses a shared vanilla animation runtime in `js/animation-system.js` and shared motion styles in `css/animations.css`.

The system is designed to work in two ways:

1. Declarative HTML with `data-*` attributes
2. Direct JavaScript calls through `window.TsnAnimations`

## Files

- `js/animation-system.js`
- `css/animations.css`
- `js/main.js`

`js/main.js` calls `window.TsnAnimations.initAll(document)` during page boot.

## Shared API

The runtime exposes these methods on `window.TsnAnimations`:

```js
window.TsnAnimations.AnimatedSection(el, options)
window.TsnAnimations.AnimatedHeading(el, options)
window.TsnAnimations.AnimatedCard(el, options)
window.TsnAnimations.FloatingElement(el, options)
window.TsnAnimations.ParticleBackground(el, options)
window.TsnAnimations.initAll(root)
```

## Supported Data Attributes

These are the main HTML hooks used across the site:

- `data-animated-section`
- `data-animated-heading`
- `data-animated-card`
- `data-floating-element`
- `data-particle-background`

Optional tuning attributes:

- `data-motion-direction`
- `data-motion-delay`
- `data-motion-distance`
- `data-motion-duration`
- `data-motion-easing`
- `data-motion-once`
- `data-animate-children`
- `data-child-animation`
- `data-child-direction`
- `data-child-distance`
- `data-child-duration`
- `data-children-delay`
- `data-stagger`
- `data-floating-delay`
- `data-floating-duration`
- `data-particle-count`
- `data-particle-link-distance`
- `data-particle-speed`

## Direction Values

Use these values with `data-motion-direction`:

- `up`
- `down`
- `left`
- `right`
- `scale`

If no direction is set, the runtime defaults to `up`.

## Reusable Patterns

### 1. Animated Section

Use for paragraphs, wrappers, CTA containers, and section-level reveal blocks.

```html
<div
  class="reveal"
  data-animated-section
  data-motion-direction="up"
  data-motion-delay="120"
>
  <div class="section-label">Section Label</div>
  <p>Content goes here.</p>
</div>
```

### 2. Animated Heading

Use for `h1`, `h2`, and other multi-line headings. The runtime automatically wraps lines split by `<br>` and staggers them.

```html
<h1 data-animated-heading data-motion-delay="220">
  Build Faster.<br>
  <span>Launch Cleaner.</span>
</h1>
```

Notes:

- `<br>` creates separate animated heading lines.
- The runtime adds internal wrappers automatically.
- Do not manually add `tsn-animated-heading__line` markup in HTML.

### 3. Animated Card

Use for cards, panels, feature rows, testimonials, and boxed content.

```html
<article
  class="feature-card reveal-scale"
  data-animated-card
  data-motion-direction="scale"
>
  <h3>Card Title</h3>
  <p>Card copy.</p>
</article>
```

### 4. Floating Element

Use only for decorative floating chips, highlight cards, or accents.

```html
<div
  class="floating-chip"
  data-animated-card
  data-floating-element
  data-floating-delay="600"
>
  Floating content
</div>
```

### 5. Particle Background

Use on a section wrapper that should render a lightweight particle canvas behind its content.

```html
<section id="hero" data-particle-background>
  <div class="container">
    ...
  </div>
</section>
```

Notes:

- The runtime inserts a canvas automatically.
- The section should already be positioned normally; the runtime handles stacking.
- Particle animation is disabled for users with reduced motion enabled.

## Animating Children With Stagger

To animate child items from a single parent, configure the parent and let the runtime initialize the children.

```html
<div
  data-animated-section
  data-animate-children=".card"
  data-child-animation="card"
  data-child-direction="up"
  data-stagger="100"
  data-children-delay="180"
>
  <article class="card">One</article>
  <article class="card">Two</article>
  <article class="card">Three</article>
</div>
```

Common values for `data-child-animation`:

- `section`
- `card`
- `heading`

Use `data-animate-children="children"` to target direct children only.

## JavaScript Usage

Use direct JS calls when HTML is injected dynamically after page load.

```js
const grid = document.getElementById('dynamicGrid');
grid.innerHTML = `
  <article class="card" data-animated-card data-motion-direction="up">...</article>
`;

window.TsnAnimations.initAll(grid);
```

You can also initialize one node directly:

```js
const el = document.querySelector('.custom-panel');
window.TsnAnimations.AnimatedCard(el, {
  direction: 'right',
  delay: 200,
  duration: 900
});
```

## Reduced Motion

The animation system respects `prefers-reduced-motion: reduce`.

When reduced motion is enabled:

- reveal elements become visible without heavy transform animation
- floating loops stop
- particle canvas is hidden
- transition-heavy motion is disabled

Do not add custom animation code that ignores reduced motion.

## Current Project Usage

These patterns are already used in the project:

- Hero particle background on `index.html`
- Staggered hero heading and CTA animations on `index.html`
- Card and section reveal hooks across:
  - `index.html`
  - `about.html`
  - `services.html`
  - `blog.html`
  - `ventures.html`
  - `venture-detail.html`
- Dynamic content initialization in:
  - `js/homepage-redesign.js`
  - `js/ventures-redesign.js`
  - `js/blog-redesign.js`
  - inline detail-page script in `venture-detail.html`

## Best Practices

- Prefer data attributes over page-specific animation code.
- Use `data-animated-heading` only on real headings.
- Use `data-floating-element` only on decorative elements, not core layout blocks.
- Re-run `window.TsnAnimations.initAll(root)` after injecting dynamic HTML.
- Keep hover motion subtle and consistent with the existing CSS.
- Reuse the shared runtime instead of creating new IntersectionObserver logic in page scripts.

## Quick Copy Blocks

### Section + heading

```html
<div
  class="reveal"
  data-animated-section
  data-animate-children="children"
  data-child-animation="section"
  data-child-direction="up"
  data-stagger="100"
>
  <div class="section-label">Label</div>
  <h2 data-animated-heading>Section title</h2>
  <p>Section description.</p>
</div>
```

### Card grid

```html
<div
  data-animated-section
  data-animate-children=".card"
  data-child-animation="card"
  data-child-direction="up"
  data-stagger="90"
>
  <article class="card" data-animated-card>Card 1</article>
  <article class="card" data-animated-card>Card 2</article>
  <article class="card" data-animated-card>Card 3</article>
</div>
```

### Floating badge

```html
<div
  data-animated-card
  data-motion-direction="right"
  data-floating-element
  data-floating-delay="700"
>
  Premium signal
</div>
```
