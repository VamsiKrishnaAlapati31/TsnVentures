# TSN Ventures Codebase Guide for AI Agents

## Project Overview
**TSN Ventures** is a premium real estate company portfolio website built as a **static HTML/CSS/JS site** featuring multiple ventures (residential layouts) across Andhra Pradesh. The site showcases completed and ongoing projects with detailed information, photo galleries, and location maps.

### Key Pages
- `index.html` - Homepage with hero, about snapshot, services, testimonials, contact
- `ventures.html` - Venture showcase with auto-scroll carousel
- `venture-detail.html` - Dynamic detail page (loads venture data via URL params)
- `about.html`, `services.html`, `blog.html` - Supporting pages
- All pages share navbar, footer, and animation system

## Data Architecture

### Venture Data System (Single Source of Truth)
**Location:** [../js/venture-data.js](../js/venture-data.js)

All venture information is stored in a **single `VENTURES` object** with venture IDs as keys:
```javascript
VENTURES['green-valley'] = {
  id, name, tagline, status, description, location,
  stats: [{icon, label, value}],
  amenities: [{icon, text}],
  images: ['path/to/image.png', ...],
  mapQuery, mapEmbed, mapLink
}
```

**Usage Pattern:**
- `venture-detail.html` reads URL query param `?venture=green-valley` and dynamically populates from `VENTURES` object
- No backend—all data is client-side JavaScript
- To add a venture: Add new object to `VENTURES` in `venture-data.js`, no HTML modifications needed

**Important:** When adding/editing ventures, update both `venture-data.js` AND check that featured venture tiles in `ventures.html` match the data structure.

## JavaScript Module Organization

### Main Modules (Load in order)
1. **[../js/main.js](../js/main.js)** - Core interactions (preloader, navbar scroll, nav toggle, scroll reveal, animated counters)
   - Uses `Intersection Observer` for lazy reveal animations
   - Navbar hides on scroll down, shows on scroll up (throttled with `requestAnimationFrame`)
   - Active nav link detection via `window.location.pathname`

2. **[../js/carousel.js](../js/carousel.js)** - Auto-scroll carousel (duplicates items for seamless infinite loop)
   - Minimal—just duplicates carousel track HTML for infinite effect
   - CSS animations handle the actual scrolling

3. **[../js/lightbox.js](../js/lightbox.js)** - Image gallery lightbox
   - Triggered by `[data-lightbox]` attributes on images
   - Keyboard navigation: Arrow keys to navigate, Escape to close
   - Gallery context: Lightbox remembers image order for prev/next

## CSS & Animation System

### Design Tokens ([../css/style.css](../css/style.css))
**CSS variables in `:root`:**
- **Colors:** `--primary: #1a5632` (green), `--accent: #d4a853` (gold)
- **Typography:** `--font-heading: 'Outfit'`, `--font-body: 'Inter'`
- **Spacing:** `--space-sm` through `--space-3xl` (use for consistency)
- **Transitions:** `--transition-fast` (0.2s), `--transition-smooth` (0.5s), `--transition-bounce` (0.6s)

### Animation Patterns ([../css/animations.css](../css/animations.css))
**Scroll Reveal Classes** (triggered by Intersection Observer in main.js):
- `.reveal` - fade in
- `.reveal-left` / `.reveal-right` - slide + fade
- `.reveal-scale` - scale + fade
- `.stagger-children` - staggers child animations

**Usage:** Apply class to element, main.js automatically triggers on scroll into viewport.

**Hero Animations:**
- Ken Burns effect on hero background image
- Staggered entrance for hero label, title, description, buttons

**Preloader:** Pulsing logo animation, auto-hides after 3s or on window load

## HTML Structure Patterns

### Navigation Setup
```html
<nav class="navbar" id="navbar">
  <a href="index.html" class="nav-logo">...</a>
  <div class="nav-links" id="navLinks">
    <a href="page.html">Link</a>
  </div>
  <button class="nav-toggle" id="navToggle">...</button>
</nav>
```
- Mobile toggle handled by main.js
- Active link auto-detected; manual `.active` only for non-homepage defaults

### Venture Detail Pattern
```html
<section id="detailHero">
  <img id="detailHeroImage">
  <h1 id="detailName"></h1>
  <span id="detailBadge"></span>
</section>
<!-- Elements with id="detail*" are populated by JavaScript -->
```
Venture detail page loads data via URL: `venture-detail.html?venture=green-valley`

### Gallery/Lightbox Pattern
```html
<img src="path/to/image.png" data-lightbox="path/to/image.png" alt="description">
```
Add `data-lightbox` attribute to enable click-to-enlarge. Order in DOM determines prev/next sequence.

## Developer Workflows

### Adding a New Venture
1. Add object to `VENTURES` in [../js/venture-data.js](../js/venture-data.js) with structure matching existing entries
2. Ensure images are in `assets/images/`
3. (Optional) Add featured tile in `ventures.html` auto-scroll carousel if launching publicly

### Updating Venture Details
1. Edit venture object in `venture-data.js`
2. Changes reflect immediately across site (no page rebuilds needed)
3. Verify amenities, stats, images are valid

### Adding a New Static Page
1. Copy existing page (e.g., `about.html`) as template
2. Update `<title>`, meta description, content
3. Ensure navbar `.active` link points to new page
4. Add link in navbar `nav-links` on all pages

### Styling New Components
1. Add CSS to [../css/style.css](../css/style.css) or [../css/animations.css](../css/animations.css)
2. Use CSS variables (e.g., `var(--primary)`, `var(--space-lg)`) for consistency
3. Use predefined transitions: `transition: var(--transition-smooth)`
4. For animations, follow reveal pattern (add class, main.js triggers)

## Key Integration Points

- **URL Query Params:** `venture-detail.html?venture=green-valley` pulls data from `VENTURES` object
- **Font Awesome Icons:** Used for amenity icons, stats, nav toggle, back links—already linked in HTML head
- **Google Maps Embed:** Venture data includes `mapEmbed` URL for detail page; uses API key in data
- **Preloader:** Automatically hides after page load or 3s timeout; controlled by main.js

## Common Patterns to Preserve

- **Namespace Everything:** CSS classes like `.detail-*`, `.hero-*` avoid conflicts
- **Data Attributes:** Use `[data-*]` for JS targeting (e.g., `[data-count]`, `[data-lightbox]`)
- **Semantic HTML:** Use `<section>`, `<nav>`, heading hierarchy
- **Accessibility:** Include `alt` text, `aria-label` on buttons, proper heading structure
- **Mobile First:** Flexbox layouts, `@media` breakpoints for tablets/desktop
- **Performance:** Intersection Observer for lazy animations, no unnecessary DOM manipulation
