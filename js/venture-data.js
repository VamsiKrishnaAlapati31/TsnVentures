/* =============================
   TSN Ventures — Venture Data
   All venture details in one place
   ============================= */

const VENTURES = {
  'green-city': {
    id: 'green-city',
    name: 'TSN Ventures (Green City)',
    tagline: 'Premium Residential Layout in Gantavarigudem',
    status: 'completed',
    badge: 'Completed',
    badgeClass: 'badge-completed',
    description: `TSN Ventures (Green City) is a 15-acre premium residential layout nestled in the serene surroundings of Gantavarigudem, Andhra Pradesh. Designed for modern families, this venture features 50+ thoughtfully planned plots with complete infrastructure already in place.

Every plot comes ready to build — with paved internal roads, a comprehensive drainage network, piped water supply, and landscaped green spaces. Government-approved layout with clear title documentation ensures total peace of mind for buyers.`,
    location: 'W942+P9C, Gantavarigudem, Dubacherla, Andhra Pradesh 534112',
    mapQuery: 'W942%2BP9C%2C+Gantavarigudem%2C+Dubacherla%2C+Andhra+Pradesh+534112',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=W942%2BP9C%2C+Gantavarigudem%2C+Dubacherla%2C+Andhra+Pradesh+534112',
    mapLink: 'https://maps.app.goo.gl/9akepgPMiPsnVwNt7',
    stats: [
      { icon: 'fas fa-th-large', label: 'Total Plots', value: '50+' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '15 Acres' },
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Gantavarigudem' },
      { icon: 'fas fa-road', label: 'Road Width', value: '30 ft' }
    ],
    amenities: [
      { icon: 'fas fa-road', text: 'BT Paved Internal Roads' },
      { icon: 'fas fa-tint', text: 'Underground Drainage System' },
      { icon: 'fas fa-water', text: 'Piped Water Supply' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure' },
      { icon: 'fas fa-tree', text: 'Landscaped Gardens & Green Spaces' },
      { icon: 'fas fa-shield-alt', text: 'Compound Wall & Security' },
      { icon: 'fas fa-file-alt', text: 'Government Approved Layout' },
      { icon: 'fas fa-certificate', text: 'Clear Legal Documentation' }
    ],
    images: [
      'assets/images/ventures/green-city/01-main.jpg',
      'assets/images/ventures/green-city/02-gate.jpg',
      'assets/images/ventures/green-city/03-garden.jpg',
      'assets/images/ventures/green-city/04-play-area.jpg',
      'assets/images/ventures/green-city/05-road.jpg',
      'assets/images/ventures/green-city/06-house.jpg',
      'assets/images/ventures/green-city/07-road-layout.png'
    ],
    heroImage: 'assets/images/ventures/green-city/01-main.jpg'
  },

  'royal-gardens': {
    id: 'royal-gardens',
    name: 'TSN Royal Gardens',
    tagline: 'Flagship Gated Community in Dubacherla',
    status: 'completed',
    badge: 'Completed',
    badgeClass: 'badge-completed',
    description: `TSN Royal Gardens is our flagship venture located in Dubacherla, Andhra Pradesh. This gated community features 80 premium residential plots spread across 25 acres, making it one of the most sought-after residential layouts in the region.

The community is designed for security and convenience — featuring a gated entry with 24/7 security, a community hall for gatherings, a children's play area, and underground drainage throughout. A true premium living experience.`,
    location: 'Dubacherla, Andhra Pradesh',
    mapQuery: 'Dubacherla,Andhra+Pradesh,India',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Dubacherla,Andhra+Pradesh,India',
    mapLink: 'https://www.google.com/maps/search/TSN+Royal+Gardens+Dubacherla+Andhra+Pradesh',
    stats: [
      { icon: 'fas fa-th-large', label: 'Total Plots', value: '80' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '25 Acres' },
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Dubacherla' },
      { icon: 'fas fa-shield-alt', label: 'Security', value: '24/7' }
    ],
    amenities: [
      { icon: 'fas fa-door-closed', text: 'Gated Entry with Security Cabin' },
      { icon: 'fas fa-shield-alt', text: '24/7 Security' },
      { icon: 'fas fa-users', text: 'Community Hall' },
      { icon: 'fas fa-child', text: "Children's Play Area" },
      { icon: 'fas fa-tint', text: 'Underground Drainage' },
      { icon: 'fas fa-road', text: 'Wide Internal Roads' },
      { icon: 'fas fa-water', text: 'Piped Water Supply' },
      { icon: 'fas fa-file-alt', text: 'Government Approved Layout' }
    ],
    images: [
      'assets/images/venture-1.png',
      'assets/images/hero-banner.png',
      'assets/images/venture-3.png',
      'assets/images/venture-2.png'
    ],
    heroImage: 'assets/images/venture-1.png'
  },

  'premium-villas': {
    id: 'premium-villas',
    name: 'TSN Premium Villas',
    tagline: 'Luxury Custom-Built Villas Across Andhra Pradesh',
    status: 'completed',
    badge: 'Completed',
    badgeClass: 'badge-completed',
    description: `TSN Premium Villas represents the pinnacle of our contract construction offering. These exclusive custom-built villas feature modern architecture with premium finishes, smart home integrations, and professional landscaping.

We've delivered 20 stunning villas across multiple high-demand locations in Andhra Pradesh. Every villa is uniquely designed to the buyer's vision with full project management from blueprint to handover.`,
    location: 'Multiple Locations, Andhra Pradesh',
    mapQuery: 'Gantavarigudem,Andhra+Pradesh,India',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Gantavarigudem,Andhra+Pradesh,India',
    mapLink: 'https://www.google.com/maps/search/Gantavarigudem+Andhra+Pradesh',
    stats: [
      { icon: 'fas fa-home', label: 'Villas Built', value: '20' },
      { icon: 'fas fa-map-marker-alt', label: 'Locations', value: 'Multiple' },
      { icon: 'fas fa-ruler-combined', label: 'Avg. Size', value: '2400 sqft' },
      { icon: 'fas fa-star', label: 'Rating', value: '5 ★' }
    ],
    amenities: [
      { icon: 'fas fa-drafting-compass', text: 'Custom Architecture & Design' },
      { icon: 'fas fa-paint-roller', text: 'Premium Interior Finishes' },
      { icon: 'fas fa-wifi', text: 'Smart Home Features' },
      { icon: 'fas fa-tree', text: 'Professional Landscaping' },
      { icon: 'fas fa-car', text: 'Private Parking & Driveway' },
      { icon: 'fas fa-swimming-pool', text: 'Optional Pool & Terrace' },
      { icon: 'fas fa-solar-panel', text: 'Solar-Ready Infrastructure' },
      { icon: 'fas fa-hard-hat', text: 'Full Project Management' }
    ],
    images: [
      'assets/images/venture-3.png',
      'assets/images/venture-1.png',
      'assets/images/service-construction.png',
      'assets/images/hero-banner.png'
    ],
    heroImage: 'assets/images/venture-3.png'
  },

  'sunrise-layout': {
    id: 'sunrise-layout',
    name: 'TSN Sunrise Layout',
    tagline: 'Massive 30-Acre Development Near Eluru',
    status: 'ongoing',
    badge: 'Ongoing',
    badgeClass: 'badge-ongoing',
    description: `TSN Sunrise Layout is our most ambitious project yet — a massive 30-acre development near Eluru with 100+ premium residential plots. Infrastructure work including drainage systems and road construction is actively in progress.

This is an excellent investment opportunity. Plots are available for booking now at early-investor pricing. As infrastructure nears completion, prices are expected to appreciate significantly.`,
    location: 'Near Eluru, Andhra Pradesh',
    mapQuery: 'Eluru,Andhra+Pradesh,India',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Eluru,Andhra+Pradesh,India',
    mapLink: 'https://www.google.com/maps/search/Eluru+Andhra+Pradesh',
    stats: [
      { icon: 'fas fa-th-large', label: 'Total Plots', value: '100+' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '30 Acres' },
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Near Eluru' },
      { icon: 'fas fa-calendar', label: 'Completion', value: '2026' }
    ],
    amenities: [
      { icon: 'fas fa-road', text: 'Wide BT Roads (Under Construction)' },
      { icon: 'fas fa-tint', text: 'Drainage Network (In Progress)' },
      { icon: 'fas fa-water', text: 'Water Supply Pipeline' },
      { icon: 'fas fa-bolt', text: 'Electricity Lines' },
      { icon: 'fas fa-tree', text: 'Avenue Plantation' },
      { icon: 'fas fa-street-view', text: 'Street Lighting' },
      { icon: 'fas fa-file-alt', text: 'Government Approved Layout' },
      { icon: 'fas fa-tags', text: 'Early Investor Pricing Available' }
    ],
    images: [
      'assets/images/service-land.png',
      'assets/images/hero-banner.png',
      'assets/images/venture-1.png',
      'assets/images/venture-2.png'
    ],
    heroImage: 'assets/images/service-land.png'
  },

  'heights-phase2': {
    id: 'heights-phase2',
    name: 'TSN Heights Phase 2',
    tagline: 'Modern Multi-Story Contract Homes in Eluru',
    status: 'ongoing',
    badge: 'Ongoing',
    badgeClass: 'badge-ongoing',
    description: `Building on the success of TSN Heights, Phase 2 brings 15 more premium contract construction homes to Eluru. These multi-story buildings are designed for growing families, with modern amenities and spacious floor plans.

Each home is built to specification under our full contract construction model — from design to handover, everything is managed by TSN Ventures with zero compromise on quality.`,
    location: 'Eluru, Andhra Pradesh',
    mapQuery: 'Eluru,Andhra+Pradesh,India',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Eluru,Andhra+Pradesh,India',
    mapLink: 'https://www.google.com/maps/search/Eluru+Andhra+Pradesh',
    stats: [
      { icon: 'fas fa-building', label: 'Homes', value: '15' },
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Eluru' },
      { icon: 'fas fa-layer-group', label: 'Floors', value: 'G + 2' },
      { icon: 'fas fa-calendar', label: 'Completion', value: '2026' }
    ],
    amenities: [
      { icon: 'fas fa-drafting-compass', text: 'Custom Design Per Buyer' },
      { icon: 'fas fa-hard-hat', text: 'End-to-End Construction' },
      { icon: 'fas fa-layer-group', text: 'Multi-Story Structure' },
      { icon: 'fas fa-paint-roller', text: 'Premium Finishes' },
      { icon: 'fas fa-car', text: 'Ground Floor Parking' },
      { icon: 'fas fa-shower', text: 'Modern Bathrooms & Kitchen' },
      { icon: 'fas fa-bolt', text: 'Full Electrical & Plumbing' },
      { icon: 'fas fa-check-circle', text: 'Quality Guaranteed' }
    ],
    images: [
      'assets/images/venture-2.png',
      'assets/images/service-construction.png',
      'assets/images/venture-3.png',
      'assets/images/venture-1.png'
    ],
    heroImage: 'assets/images/venture-2.png'
  },

  'green-valley-phase2': {
    id: 'green-valley-phase2',
    name: 'TSN Green Valley Phase 2',
    tagline: 'Upcoming — Pre-Booking Open in Gantavarigudem',
    status: 'upcoming',
    badge: 'Upcoming',
    badgeClass: 'badge-upcoming',
    description: `Due to the incredible demand and success of TSN Green Valley, we are expanding with Phase 2 — 60+ new premium plots in the same beloved location of Gantavarigudem. Pre-booking is now open with special launch pricing that won't last long.

Phase 2 will have all the same quality infrastructure as Phase 1, with even better amenities planned including a wider entry road and dedicated jogging track. Secure your plot now before official launch.`,
    location: 'Gantavarigudem, Andhra Pradesh',
    mapQuery: 'Gantavarigudem,Andhra+Pradesh,India',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Gantavarigudem,Andhra+Pradesh,India',
    mapLink: 'https://www.google.com/maps/search/Gantavarigudem+Andhra+Pradesh',
    stats: [
      { icon: 'fas fa-th-large', label: 'Planned Plots', value: '60+' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '20 Acres' },
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Gantavarigudem' },
      { icon: 'fas fa-tags', label: 'Status', value: 'Pre-Booking' }
    ],
    amenities: [
      { icon: 'fas fa-road', text: 'Wide Entry & Internal Roads' },
      { icon: 'fas fa-tint', text: 'Modern Drainage System' },
      { icon: 'fas fa-water', text: 'Piped Water Supply' },
      { icon: 'fas fa-tree', text: 'Jogging Track & Green Zone' },
      { icon: 'fas fa-street-view', text: 'Street Lighting' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure' },
      { icon: 'fas fa-file-alt', text: 'Government Approved Layout' },
      { icon: 'fas fa-tags', text: 'Special Launch Pricing' }
    ],
    images: [
      'assets/images/service-construction.png',
      'assets/images/hero-banner.png',
      'assets/images/service-land.png',
      'assets/images/venture-2.png'
    ],
    heroImage: 'assets/images/service-construction.png'
  }
};
