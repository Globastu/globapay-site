// Icon library using SVG icons similar to Lucide React icons
const Icons = {
  // Dashboard icons
  layoutDashboard: `<svg class="lucide lucide-layout-dashboard" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"/></svg>`,
  
  // User/merchant icons
  users: `<svg class="lucide lucide-users" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  
  user: `<svg class="lucide lucide-user" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,

  // Transaction icons
  fileText: `<svg class="lucide lucide-file-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><path d="M10 9H8"/></svg>`,

  // Payment links
  link: `<svg class="lucide lucide-link" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,

  // Security/fraud
  shield: `<svg class="lucide lucide-shield" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,

  // Reports/analytics
  barChart3: `<svg class="lucide lucide-bar-chart-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,

  // Settings
  settings: `<svg class="lucide lucide-settings" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 000 2l.08.15a2 2 0 010 2l-.08.15a2 2 0 000 2l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.38a2 2 0 000-2l-.08-.15a2 2 0 010-2l.08-.15a2 2 0 000-2l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,

  // Gift cards
  gift: `<svg class="lucide lucide-gift" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20,12 20,22 4,22 4,12"/><rect width="20" height="5" x="2" y="7"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,

  // Invoices
  receipt: `<svg class="lucide lucide-receipt" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 18V6"/></svg>`,

  // Checkout builder
  code: `<svg class="lucide lucide-code" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>`,

  // Building/platforms
  building: `<svg class="lucide lucide-building" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,

  // Navigation icons
  menu: `<svg class="lucide lucide-menu" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,

  chevronLeft: `<svg class="lucide lucide-chevron-left" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>`,

  chevronRight: `<svg class="lucide lucide-chevron-right" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`,

  chevronDown: `<svg class="lucide lucide-chevron-down" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>`,

  arrowLeft: `<svg class="lucide lucide-arrow-left" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`,

  // Search and notifications
  search: `<svg class="lucide lucide-search" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,

  bell: `<svg class="lucide lucide-bell" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,

  // Theme icons
  sun: `<svg class="lucide lucide-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>`,

  moon: `<svg class="lucide lucide-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,

  monitor: `<svg class="lucide lucide-monitor" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,

  // Database/environment
  database: `<svg class="lucide lucide-database" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,

  // Logout
  logOut: `<svg class="lucide lucide-log-out" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,

  // Status icons
  checkCircle: `<svg class="lucide lucide-check-circle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>`,

  xCircle: `<svg class="lucide lucide-x-circle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>`,

  clock: `<svg class="lucide lucide-clock" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,

  // Arrows
  arrowUp: `<svg class="lucide lucide-arrow-up" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>`,

  arrowDown: `<svg class="lucide lucide-arrow-down" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>`,

  // Plus/add
  plus: `<svg class="lucide lucide-plus" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,

  // More actions
  moreHorizontal: `<svg class="lucide lucide-more-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,

  // Edit
  edit: `<svg class="lucide lucide-edit" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,

  // Trash/delete
  trash: `<svg class="lucide lucide-trash-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,

  // Copy
  copy: `<svg class="lucide lucide-copy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,

  // Download
  download: `<svg class="lucide lucide-download" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,

  // External link
  externalLink: `<svg class="lucide lucide-external-link" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,

  // Filter
  filter: `<svg class="lucide lucide-filter" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/></svg>`,

  // Refresh
  refresh: `<svg class="lucide lucide-refresh-cw" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>`,

  // Dollar sign
  dollarSign: `<svg class="lucide lucide-dollar-sign" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,

  // Trending up
  trendingUp: `<svg class="lucide lucide-trending-up" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>`,

  // Alert triangle
  alertTriangle: `<svg class="lucide lucide-alert-triangle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><path d="M12 17h.01"/></svg>`,

  // Activity
  activity: `<svg class="lucide lucide-activity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>`,

  // Credit card
  creditCard: `<svg class="lucide lucide-credit-card" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`
};

// Helper function to create an icon with specific classes
function createIcon(iconName, className = 'w-5 h-5') {
  const iconSvg = Icons[iconName];
  if (!iconSvg) {
    console.warn(`Icon "${iconName}" not found`);
    return `<div class="${className}"></div>`;
  }
  
  // Add classes to the SVG
  return iconSvg.replace('<svg class="lucide', `<svg class="lucide ${className}`);
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.Icons = Icons;
  window.createIcon = createIcon;
}