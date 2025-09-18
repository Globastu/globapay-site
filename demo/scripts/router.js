// Simple router for the Globapay demo
class DemoRouter {
  constructor() {
    this.currentRoute = null;
    this.routes = {};
    this.demoType = this.getDemoType();
    
    // Initialize router
    this.init();
  }

  init() {
    // Setup routes based on demo type
    if (this.demoType === 'merchant') {
      this.routes = {
        '': 'dashboard',
        'dashboard': 'dashboard',
        'transactions': 'transactions',
        'reports': 'reports',
        'settings': 'settings'
      };
    } else {
      this.routes = {
        '': 'dashboard',
        'dashboard': 'dashboard',
        'merchants': 'merchants',
        'transactions': 'transactions',
        'reports': 'reports',
        'settings': 'settings'
      };
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());
    
    // Handle initial route
    this.handleRouteChange();
  }

  getDemoType() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('demo') === 'platform' ? 'platform' : 'merchant';
  }

  getCurrentRoute() {
    const hash = window.location.hash.slice(1);
    return this.routes[hash] || this.routes[''];
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleRouteChange() {
    const newRoute = this.getCurrentRoute();
    
    if (newRoute !== this.currentRoute) {
      this.currentRoute = newRoute;
      this.renderRoute(newRoute);
      this.updateActiveNavItem(newRoute);
    }
  }

  renderRoute(route) {
    const content = document.getElementById('page-content');
    
    switch (route) {
      case 'dashboard':
        content.innerHTML = DashboardComponent.render(this.demoType);
        // Initialize interactive charts
        if (DashboardComponent.initializeCharts) {
          DashboardComponent.initializeCharts();
        }
        break;
      case 'transactions':
        content.innerHTML = TransactionsComponent.render(this.demoType);
        break;
      case 'merchants':
        if (this.demoType === 'platform') {
          content.innerHTML = MerchantsComponent.render();
        } else {
          this.navigate('dashboard');
        }
        break;
      case 'reports':
        content.innerHTML = ReportsComponent.render(this.demoType);
        break;
      case 'settings':
        content.innerHTML = SettingsComponent.render(this.demoType);
        break;
      default:
        // Handle other routes as placeholders
        content.innerHTML = this.renderPlaceholderPage(route);
        break;
    }
  }

  renderPlaceholderPage(route) {
    const routeNames = {
      'platforms': 'Platforms',
      'payment-links': 'Payment Links',
      'checkout-builder': 'Checkout Builder',
      'invoices': 'Invoices',
      'fraud': 'Fraud',
      'gift-cards': 'Gift Cards'
    };

    const routeName = routeNames[route] || route.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return `
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">${routeName}</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          This is a demo placeholder for the ${routeName.toLowerCase()} section.
        </p>
      </div>

      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 p-8">
        <div class="text-center">
          <div class="text-6xl mb-6">🚧</div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            ${routeName} - Coming Soon
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            This section would contain the full ${routeName.toLowerCase()} functionality in the real platform.
          </p>
          <button 
            onclick="router.navigate('dashboard')"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    `;
  }

  updateActiveNavItem(route) {
    // Update both desktop and mobile sidebars
    this.updateSidebarActiveState('#sidebar', route);
    this.updateSidebarActiveState('#mobile-sidebar', route);
  }

  updateSidebarActiveState(sidebarSelector, route) {
    const sidebar = document.querySelector(sidebarSelector);
    if (!sidebar) return;

    // Remove active class from all nav items
    sidebar.querySelectorAll('a > div').forEach(item => {
      item.classList.remove('bg-primary', 'text-white', 'shadow-sm', 'hover:bg-primary/90');
      item.classList.add('text-gray-700', 'dark:text-gray-300');
      
      // Update icon colors
      const icon = item.querySelector('svg');
      if (icon) {
        icon.classList.remove('text-white');
        icon.classList.add('text-gray-500', 'dark:text-gray-400', 'group-hover:text-gray-700', 'dark:group-hover:text-gray-300');
      }
    });

    // Add active class to current route
    const activeLink = sidebar.querySelector(`a[href="#${route}"]`);
    if (activeLink) {
      const activeItem = activeLink.querySelector('div');
      if (activeItem) {
        activeItem.classList.remove('text-gray-700', 'dark:text-gray-300');
        activeItem.classList.add('bg-primary', 'text-white', 'shadow-sm', 'hover:bg-primary/90');
        
        // Update icon color
        const icon = activeItem.querySelector('svg');
        if (icon) {
          icon.classList.remove('text-gray-500', 'dark:text-gray-400', 'group-hover:text-gray-700', 'dark:group-hover:text-gray-300');
          icon.classList.add('text-white');
        }
      }
    }
  }
}

// Initialize router when DOM is loaded
let router;
document.addEventListener('DOMContentLoaded', () => {
  router = new DemoRouter();
});