// Topbar component that mirrors the actual Globapay platform topbar

const TopbarComponent = {
  searchQuery: '',
  environment: 'sandbox',
  theme: 'system',

  render: function(demoType) {
    const demoUser = {
      name: 'Demo User',
      email: 'demo@globapay.com',
      role: 'Admin',
      initials: 'DU'
    };

    return `
      <div class="flex w-full items-center justify-between">
        <!-- Left side - Mobile menu + Back button + Search -->
        <div class="flex items-center gap-4">
          <!-- Mobile menu toggle -->
          <button
            class="lg:hidden flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
            onclick="TopbarComponent.toggleMobileMenu()"
          >
            ${createIcon('menu', 'h-5 w-5')}
          </button>

          <!-- Back button - only show on detail pages -->
          ${this.shouldShowBackButton() ? `
            <button
              class="flex items-center gap-2 h-8 px-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
              onclick="TopbarComponent.goBack()"
              title="Go back"
            >
              ${createIcon('arrowLeft', 'h-4 w-4')}
              <span class="hidden sm:inline text-sm">Back</span>
            </button>
          ` : ''}

          <!-- Global Search -->
          <div class="relative hidden sm:flex">
            ${createIcon('search', 'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400')}
            <input
              type="text"
              placeholder="Search transactions, merchants..."
              value="${this.searchQuery}"
              onkeyup="TopbarComponent.handleSearch(event)"
              class="w-64 pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <!-- Right side - Environment + Notifications + Theme + Profile -->
        <div class="flex items-center gap-3">
          <!-- Environment Switcher -->
          <div class="relative hidden md:block">
            <button
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                this.environment === 'sandbox' 
                  ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                  : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
              }"
              onclick="TopbarComponent.toggleEnvironmentDropdown()"
            >
              ${createIcon('database', 'h-3 w-3')}
              <span class="capitalize">${this.environment}</span>
              ${createIcon('chevronDown', 'h-3 w-3')}
            </button>
            <div id="environment-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div class="p-2">
                <div class="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 mb-1">
                  Environment
                </div>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.setEnvironment('sandbox')"
                >
                  <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Sandbox</span>
                  ${this.environment === 'sandbox' ? `
                    <span class="ml-auto px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">Active</span>
                  ` : ''}
                </button>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.setEnvironment('production')"
                >
                  <div class="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Production</span>
                  ${this.environment === 'production' ? `
                    <span class="ml-auto px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">Active</span>
                  ` : ''}
                </button>
              </div>
            </div>
          </div>

          <!-- Demo Badge -->
          <div class="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200 dark:border-gray-700">
            Demo Data
          </div>

          <!-- Mobile search -->
          <button 
            class="sm:hidden flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
            onclick="TopbarComponent.toggleMobileSearch()"
          >
            ${createIcon('search', 'h-5 w-5')}
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button 
              class="flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
              onclick="TopbarComponent.toggleNotifications()"
            >
              ${createIcon('bell', 'h-5 w-5')}
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <!-- Theme toggle -->
          <div class="relative">
            <button 
              class="flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
              onclick="TopbarComponent.toggleThemeDropdown()"
            >
              ${createIcon(this.getThemeIcon(), 'h-5 w-5')}
            </button>
            <div id="theme-dropdown" class="hidden absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div class="p-1">
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.setTheme('light')"
                >
                  ${createIcon('sun', 'h-4 w-4')}
                  Light
                </button>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.setTheme('dark')"
                >
                  ${createIcon('moon', 'h-4 w-4')}
                  Dark
                </button>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.setTheme('system')"
                >
                  ${createIcon('monitor', 'h-4 w-4')}
                  System
                </button>
              </div>
            </div>
          </div>

          <!-- User Profile -->
          <div class="relative">
            <button 
              class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onclick="TopbarComponent.toggleProfileDropdown()"
            >
              <span class="text-sm font-medium">${demoUser.initials}</span>
            </button>
            <div id="profile-dropdown" class="hidden absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">${demoUser.name}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${demoUser.email}</p>
                  <p class="text-xs text-blue-600 dark:text-blue-400">Demo Mode</p>
                </div>
              </div>
              <div class="p-1">
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="TopbarComponent.showProfile()"
                >
                  ${createIcon('user', 'h-4 w-4')}
                  Profile
                </button>
                <button
                  class="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onclick="router.navigate('settings')"
                >
                  ${createIcon('settings', 'h-4 w-4')}
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  shouldShowBackButton: function() {
    const pathname = window.location.hash.replace('#', '');
    return pathname.includes('/') && pathname !== '' && pathname !== 'dashboard';
  },

  getThemeIcon: function() {
    switch (this.theme) {
      case 'light': return 'sun';
      case 'dark': return 'moon';
      case 'system': return 'monitor';
      default: return 'monitor';
    }
  },

  toggleMobileMenu: function() {
    const overlay = document.getElementById('mobile-overlay');
    const sidebar = document.getElementById('mobile-sidebar');
    
    overlay.classList.toggle('hidden');
    sidebar.classList.toggle('hidden');
  },

  goBack: function() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.navigate('dashboard');
    }
  },

  handleSearch: function(event) {
    this.searchQuery = event.target.value;
    // In a real app, this would trigger search functionality
    console.log('Search query:', this.searchQuery);
  },

  toggleEnvironmentDropdown: function() {
    this.closeAllDropdowns();
    const dropdown = document.getElementById('environment-dropdown');
    dropdown.classList.toggle('hidden');
  },

  setEnvironment: function(env) {
    this.environment = env;
    this.closeAllDropdowns();
    this.updateTopbar();
    console.log('Environment changed to:', env);
  },

  toggleThemeDropdown: function() {
    this.closeAllDropdowns();
    const dropdown = document.getElementById('theme-dropdown');
    dropdown.classList.toggle('hidden');
  },

  setTheme: function(theme) {
    this.theme = theme;
    this.closeAllDropdowns();
    
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'light') {
      html.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
    
    localStorage.setItem('theme', theme);
    this.updateTopbar();
  },

  toggleProfileDropdown: function() {
    this.closeAllDropdowns();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
  },

  toggleNotifications: function() {
    alert('Notifications:\n\n• New transaction from Example Store\n• Failed payment alert\n• Weekly report available\n\nIn a real app, this would show actual notifications.');
  },

  toggleMobileSearch: function() {
    const query = prompt('Search transactions, merchants...');
    if (query) {
      this.searchQuery = query;
      console.log('Mobile search query:', query);
    }
  },

  showProfile: function() {
    alert('Profile:\n\nDemo User\ndemo@globapay.com\nAdmin Role\n\nIn a real app, this would open the profile page.');
  },

  closeAllDropdowns: function() {
    const dropdowns = ['environment-dropdown', 'theme-dropdown', 'profile-dropdown'];
    dropdowns.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('hidden');
      }
    });
  },

  updateTopbar: function() {
    const currentDemoType = new URLSearchParams(window.location.search).get('demo') === 'platform' ? 'platform' : 'merchant';
    const topbar = document.getElementById('topbar');
    if (topbar) {
      topbar.innerHTML = this.render(currentDemoType);
    }
  }
};

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.relative')) {
    TopbarComponent.closeAllDropdowns();
  }
});

// Close mobile menu when clicking overlay
document.addEventListener('click', function(event) {
  if (event.target.id === 'mobile-overlay') {
    TopbarComponent.toggleMobileMenu();
  }
});