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
    descriptionKeys: [
      'ventures.greenCity.description.p1',
      'ventures.greenCity.description.p2'
    ],
    summaryKey: 'ventures.greenCity.description.p1',
    location: 'TSN Ventures, W942+P9C, Gantavarigudem, Dubacherla, Andhra Pradesh 534112',
    availability: 'Completed',
    mapQuery: 'TSN+Ventures,+W942+P9C,+Gantavarigudem,+Dubacherla,+Andhra+Pradesh+534112',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=TSN+Ventures,+W942+P9C,+Gantavarigudem,+Dubacherla,+Andhra+Pradesh+534112',
    mapLink: 'https://www.google.com/maps/search/TSN+Ventures,+W942+P9C,+Gantavarigudem,+Dubacherla,+Andhra+Pradesh+534112',
    stats: [
      { icon: 'fas fa-map-marker-alt', label: 'Location', labelKey: 'ventures.stats.location', value: 'Gantavarigudem' },
      { icon: 'fas fa-expand', label: 'Total Area', labelKey: 'ventures.stats.totalArea', value: '8 Acres' },
      { icon: 'fas fa-certificate', label: 'Approvals', labelKey: 'ventures.stats.approvals', value: 'DTCP + RERA' },
      { icon: 'fas fa-university', label: 'Loans', labelKey: 'ventures.stats.loans', value: 'SBI / HDFC / Axis' },
      { icon: 'fas fa-calendar-check', label: 'Project Timeline', labelKey: 'ventures.stats.timeline', value: '2021 - 2023' }
    ],
    amenities: [
      { icon: 'fas fa-road', text: 'BT Paved Internal Roads', textKey: 'ventures.greenCity.amenities.road' },
      { icon: 'fas fa-certificate', text: 'DTCP Approved Layout', textKey: 'ventures.greenCity.amenities.dtcp' },
      { icon: 'fas fa-certificate', text: 'RERA Approved Project', textKey: 'ventures.greenCity.amenities.rera' },
      { icon: 'fas fa-university', text: 'SBI, HDFC & Axis Bank Loans Available', textKey: 'ventures.greenCity.amenities.loans' },
      { icon: 'fas fa-tint', text: 'Open Drainage System', textKey: 'ventures.greenCity.amenities.drainage' },
      { icon: 'fas fa-water', text: 'Piped Water Supply', textKey: 'ventures.greenCity.amenities.water' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure', textKey: 'ventures.greenCity.amenities.power' },
      { icon: 'fas fa-file-alt', text: 'Completed Development with Clear Documentation', textKey: 'ventures.greenCity.amenities.docs' }
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
    descriptionKeys: [
      'ventures.sunriseLayout.description.p1',
      'ventures.sunriseLayout.description.p2'
    ],
    summaryKey: 'ventures.sunriseLayout.description.p1',
    location: 'Nallajerlla, beside Star Grand, TPG Rd',
    availability: 'Ongoing',
    mapQuery: 'Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    mapEmbed: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    mapLink: 'https://www.google.com/maps/search/Nallajerlla,+beside+Star+Grand,+TPG+Rd',
    stats: [
      { icon: 'fas fa-map-marker-alt', label: 'Location', labelKey: 'ventures.stats.location', value: 'Nallajerlla' },
      { icon: 'fas fa-expand', label: 'Total Area', labelKey: 'ventures.stats.totalArea', value: '10 Acres' },
      { icon: 'fas fa-certificate', label: 'Approvals', labelKey: 'ventures.stats.approvals', value: 'RUDA + RERA' },
      { icon: 'fas fa-university', label: 'Plot Loans', labelKey: 'ventures.stats.plotLoans', value: 'HDFC Smart Plot Loans' },
      { icon: 'fas fa-home', label: 'House Loans', labelKey: 'ventures.stats.houseLoans', value: 'SBI / BOI / Bank of Baroda' }
    ],
    amenities: [
      { icon: 'fas fa-certificate', text: 'RUDA Approved Layout', textKey: 'ventures.sunriseLayout.amenities.ruda' },
      { icon: 'fas fa-certificate', text: 'RERA Approved Layout', textKey: 'ventures.sunriseLayout.amenities.rera' },
      { icon: 'fas fa-university', text: 'HDFC Smart Plot Loans Available', textKey: 'ventures.sunriseLayout.amenities.plotLoans' },
      { icon: 'fas fa-home', text: 'SBI, BOI & Bank of Baroda House Loans Available', textKey: 'ventures.sunriseLayout.amenities.houseLoans' },
      { icon: 'fas fa-road', text: 'BT Paved Internal Roads', textKey: 'ventures.sunriseLayout.amenities.road' },
      { icon: 'fas fa-tree', text: 'Avenue Plantation', textKey: 'ventures.sunriseLayout.amenities.plantation' },
      { icon: 'fas fa-bolt', text: 'Electricity Infrastructure', textKey: 'ventures.sunriseLayout.amenities.power' },
      { icon: 'fas fa-file-alt', text: 'Clear Project Documentation', textKey: 'ventures.sunriseLayout.amenities.docs' }
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
