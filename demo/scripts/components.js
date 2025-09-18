// Shared component utilities and helpers

const ComponentUtils = {
  // Create SVG icons
  createIcon: (name, className = 'w-5 h-5') => {
    const icons = {
      dashboard: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
      </svg>`,
      
      transactions: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>`,
      
      merchants: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>`,
      
      reports: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>`,
      
      settings: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>`,
      
      menu: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>`,
      
      close: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>`,
      
      user: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>`,
      
      bell: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
      </svg>`,
      
      search: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>`,
      
      chevronDown: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>`,
      
      checkCircle: `<svg class="${className}" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
        <polyline points="22,4 12,14.01 9,11.01"></polyline>
      </svg>`,
      
      xCircle: `<svg class="${className}" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`,
      
      clock: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
      </svg>`,
      
      arrowUp: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5,12 12,5 19,12"></polyline>
      </svg>`,
      
      arrowDown: `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19,12 12,19 5,12"></polyline>
      </svg>`
    };
    
    return icons[name] || '';
  },

  // Create status badge
  createStatusBadge: (status) => {
    const statusClass = DataUtils.getStatusColor(status);
    return `<span class="status-badge status-${statusClass}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
  },

  // Create pagination component
  createPagination: (currentPage, totalPages, onPageChange) => {
    if (totalPages <= 1) return '';
    
    let pagination = '<div class="pagination">';
    pagination += '<div class="pagination-info">';
    pagination += `Showing page ${currentPage} of ${totalPages}`;
    pagination += '</div>';
    pagination += '<div class="pagination-nav">';
    
    // Previous button
    if (currentPage > 1) {
      pagination += `<button class="pagination-btn" onclick="${onPageChange}(${currentPage - 1})">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage ? ' active' : '';
      pagination += `<button class="pagination-btn${activeClass}" onclick="${onPageChange}(${i})">${i}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
      pagination += `<button class="pagination-btn" onclick="${onPageChange}(${currentPage + 1})">Next</button>`;
    }
    
    pagination += '</div>';
    pagination += '</div>';
    
    return pagination;
  },

  // Create chart placeholder
  createChartPlaceholder: (title, height = '300px') => {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${title}</h3>
        </div>
        <div class="card-content">
          <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg" style="height: ${height};">
            <div class="text-center">
              <div class="text-2xl text-gray-400 mb-2">📊</div>
              <p class="text-gray-500 dark:text-gray-400">Chart visualization would appear here</p>
              <p class="text-sm text-gray-400">In a real implementation, this would show interactive charts</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Create loading state
  createLoadingState: (text = 'Loading...') => {
    return `
      <div class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center space-y-4">
          <div class="spinner w-8 h-8 border-blue-600"></div>
          <p class="text-gray-600 dark:text-gray-400">${text}</p>
        </div>
      </div>
    `;
  },

  // Create empty state
  createEmptyState: (message, description = '') => {
    return `
      <div class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="text-4xl text-gray-400 mb-4">📭</div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${message}</h3>
          ${description ? `<p class="text-gray-500 dark:text-gray-400">${description}</p>` : ''}
        </div>
      </div>
    `;
  }
};

// Global utility functions
function formatCurrency(amount, currency = 'USD') {
  return DataUtils.formatCurrency(amount, currency);
}

function formatDate(date) {
  return DataUtils.formatDate(date);
}

function formatRelativeTime(date) {
  return DataUtils.formatRelativeTime(date);
}

function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  
  sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('hidden');
}

// Theme toggle function
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
});