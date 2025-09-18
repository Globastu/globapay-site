// Sidebar component that mirrors the actual Globapay platform sidebar

const SidebarComponent = {
  collapsed: false,

  getNavigation: function(demoType) {
    const baseNavigation = [
      {
        name: 'Overview',
        href: '#dashboard',
        icon: 'layoutDashboard'
      }
    ];

    if (demoType === 'platform') {
      baseNavigation.push({
        name: 'Platforms',
        href: '#platforms',
        icon: 'building'
      });
    }

    baseNavigation.push(
      {
        name: 'Merchants',
        href: '#merchants',
        icon: 'users'
      },
      {
        name: 'Transactions',
        href: '#transactions',
        icon: 'fileText'
      },
      {
        name: 'Payment Links',
        href: '#payment-links',
        icon: 'link'
      },
      {
        name: 'Checkout Builder',
        href: '#checkout-builder',
        icon: 'code'
      },
      {
        name: 'Invoices',
        href: '#invoices',
        icon: 'receipt'
      },
      {
        name: 'Fraud',
        href: '#fraud',
        icon: 'shield'
      },
      {
        name: 'Reports',
        href: '#reports',
        icon: 'barChart3'
      },
      {
        name: 'Gift Cards',
        href: '#gift-cards',
        icon: 'gift',
        badge: 'NEW'
      },
      {
        name: 'Settings',
        href: '#settings',
        icon: 'settings'
      }
    );

    return baseNavigation;
  },

  renderLogo: function(collapsed, demoType) {
    if (collapsed) {
      return `
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
          <span class="text-sm font-bold text-white">G</span>
        </div>
      `;
    }

    return `
      <div class="flex items-center">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
          <span class="text-sm font-bold text-white">G</span>
        </div>
        <span class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Globapay</span>
      </div>
    `;
  },

  render: function(demoType, pathname = '#dashboard') {
    const navigation = this.getNavigation(demoType);
    const tenantType = demoType === 'platform' ? 'Platform' : 'Merchant';

    return `
      <!-- Header -->
      <div class="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center w-full">
          <!-- Logo Section -->
          <div class="flex items-center flex-1 min-w-0">
            ${this.renderLogo(this.collapsed, demoType)}
            ${!this.collapsed ? `
              <div class="ml-3 flex flex-col">
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  ${tenantType}
                </span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Floating Collapse/Expand Button - Center edge of sidebar -->
      <button
        id="sidebar-toggle"
        class="absolute top-1/2 -translate-y-1/2 -right-3 h-6 w-6 p-0 flex-shrink-0 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg z-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        onclick="SidebarComponent.toggle()"
        title="${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}"
      >
        ${createIcon(this.collapsed ? 'chevronRight' : 'chevronLeft', 'h-3 w-3')}
      </button>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 p-3 overflow-y-auto sidebar-scroll">
        ${navigation.map(item => this.renderNavItem(item, pathname)).join('')}
      </nav>

      <!-- Footer -->
      ${!this.collapsed ? `
        <div class="p-4 border-t border-gray-200 dark:border-gray-800">
          <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <div class="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
            All systems operational
          </div>
        </div>
      ` : ''}
    `;
  },

  renderNavItem: function(item, pathname) {
    const isActive = pathname === item.href || (item.href !== '#dashboard' && pathname.startsWith(item.href.replace('#', '')));
    
    return `
      <a href="${item.href}" onclick="event.preventDefault(); router.navigate('${item.href.replace('#', '')}')">
        <div class="group flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
          isActive 
            ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
            : 'text-gray-700 dark:text-gray-300'
        } ${this.collapsed ? 'justify-center px-2' : ''}">
          ${createIcon(item.icon, `h-5 w-5 shrink-0 ${
            isActive 
              ? 'text-white' 
              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
          }`)}
          ${!this.collapsed ? `
            <span class="ml-3 truncate">${item.name}</span>
            ${item.badge ? `
              <span class="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                ${item.badge}
              </span>
            ` : ''}
          ` : ''}
        </div>
      </a>
    `;
  },

  toggle: function() {
    this.collapsed = !this.collapsed;
    
    // Update sidebar container classes
    const sidebarContainer = document.getElementById('sidebar-container');
    const mainContent = document.getElementById('main-content');
    
    if (this.collapsed) {
      sidebarContainer.classList.remove('sidebar-expanded');
      sidebarContainer.classList.add('sidebar-collapsed');
      mainContent.classList.remove('main-content-expanded');
      mainContent.classList.add('main-content-collapsed');
    } else {
      sidebarContainer.classList.remove('sidebar-collapsed');
      sidebarContainer.classList.add('sidebar-expanded');
      mainContent.classList.remove('main-content-collapsed');
      mainContent.classList.add('main-content-expanded');
    }

    // Re-render sidebar with new collapsed state
    this.updateSidebar();
  },

  updateSidebar: function() {
    const currentDemoType = new URLSearchParams(window.location.search).get('demo') === 'platform' ? 'platform' : 'merchant';
    const currentRoute = window.location.hash || '#dashboard';
    
    // Update both desktop and mobile sidebars
    const desktopSidebar = document.getElementById('sidebar');
    const mobileSidebar = document.querySelector('#mobile-sidebar .flex.h-full');
    
    const sidebarContent = this.render(currentDemoType, currentRoute);
    
    if (desktopSidebar) {
      desktopSidebar.innerHTML = sidebarContent;
    }
    if (mobileSidebar) {
      mobileSidebar.innerHTML = sidebarContent;
    }
  }
};