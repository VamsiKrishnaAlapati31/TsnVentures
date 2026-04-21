/* =============================
   TSN Ventures — Venture Data
   All venture details in one place
   ============================= */

const VENTURES = {
  'green-city': {
    id: 'green-city',
    name: 'TSN Ventures (Green City)',
    tagline: 'DTCP & RERA Approved Layout in Dubacherla East',
    status: 'completed',
    badge: 'Completed',
    badgeClass: 'badge-completed',
    description: `TSN Ventures (Green City) is a completed residential layout in Dubacherla East, GDV District, Andhra Pradesh. The project spans 8 acres and was developed between 2021 and 2023 with a focus on clear approvals, practical access, and buyer confidence.

The layout is DTCP and RERA approved, and homebuyers can access loan support from SBI, HDFC, and Axis Bank. Green City was planned as a reliable plotted development with the essential project approvals and financing support already in place.`,
    location: 'Dubacherla East, GDV District, Andhra Pradesh 534112',
    mapQuery: 'Dubacherla+East,+Andhra+Pradesh+534112',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Dubacherla+East,+Andhra+Pradesh+534112',
    mapLink: 'https://www.google.com/maps/search/Dubacherla+East,+Andhra+Pradesh+534112',
    stats: [
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Dubacherla East' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '8 Acres' },
      { icon: 'fas fa-certificate', label: 'Approvals', value: 'DTCP + RERA' },
      { icon: 'fas fa-university', label: 'Loans', value: 'SBI / HDFC / Axis' },
      { icon: 'fas fa-calendar-check', label: 'Project Timeline', value: '2021 - 2023' }
    ],
    amenities: [
      { icon: 'fas fa-road', text: 'BT Paved Internal Roads' },
      { icon: 'fas fa-certificate', text: 'DTCP Approved Layout' },
      { icon: 'fas fa-certificate', text: 'RERA Approved Project' },
      { icon: 'fas fa-university', text: 'SBI, HDFC & Axis Bank Loans Available' },
      { icon: 'fas fa-tint', text: 'Underground Drainage System' },
      { icon: 'fas fa-water', text: 'Piped Water Supply' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure' },
      { icon: 'fas fa-file-alt', text: 'Completed Development with Clear Documentation' }
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

  'sunrise-layout': {
    id: 'sunrise-layout',
    name: 'TSN ICONCITY',
    tagline: 'RUDA & RERA Approved Layout in Nallajerlla',
    status: 'ongoing',
    badge: 'Ongoing',
    badgeClass: 'badge-ongoing',
    description: `TSN ICONCITY is a 10-acre layout in Nallajerlla, beside Star Grand on TPG Road. The project is RUDA and RERA approved, with buyer-friendly loan support options already available.

The venture supports HDFC Smart Plot Loans and house loan options through SBI, Bank of India, and Bank of Baroda, giving buyers a practical financing path for both plot purchase and home construction.`,
    location: 'Nallajerlla, beside Star Grand, TPG Rd',
    mapQuery: 'Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    mapLink: 'https://www.google.com/maps/search/Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    stats: [
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Nallajerlla' },
      { icon: 'fas fa-expand', label: 'Total Area', value: '10 Acres' },
      { icon: 'fas fa-certificate', label: 'Approvals', value: 'RUDA + RERA' },
      { icon: 'fas fa-university', label: 'Plot Loans', value: 'HDFC Smart Plot Loans' },
      { icon: 'fas fa-home', label: 'House Loans', value: 'SBI / BOI / Bank of Baroda' }
    ],
    amenities: [
      { icon: 'fas fa-certificate', text: 'RUDA Approved Layout' },
      { icon: 'fas fa-certificate', text: 'RERA Approved Layout' },
      { icon: 'fas fa-university', text: 'HDFC Smart Plot Loans Available' },
      { icon: 'fas fa-home', text: 'SBI, BOI & Bank of Baroda House Loans Available' },
      { icon: 'fas fa-road', text: 'BT Paved Internal Roads' },
      { icon: 'fas fa-tree', text: 'Avenue Plantation' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure' },
      { icon: 'fas fa-file-alt', text: 'Clear Project Documentation' }
    ],
    images: [
      'assets/images/ventures/sunrise-layout/10-gate-day.jpeg',
      'assets/images/ventures/sunrise-layout/11-gate-night.jpeg',
      'assets/images/ventures/sunrise-layout/01-aerial.jpeg',
      'assets/images/ventures/sunrise-layout/12-overview.jpeg',
      'assets/images/ventures/sunrise-layout/06-road.jpeg',
      'assets/images/ventures/sunrise-layout/09-roadway.jpeg',
      'assets/images/ventures/sunrise-layout/07-gate.jpeg',
      'assets/images/ventures/sunrise-layout/08-entry.jpeg',
      'assets/images/ventures/sunrise-layout/03-garden.jpeg',
      'assets/images/ventures/sunrise-layout/04-roadside.jpeg',
      'assets/images/ventures/sunrise-layout/02-house.jpeg'
    ],
    heroImage: 'assets/images/ventures/sunrise-layout/10-gate-day.jpeg'
  },

};
