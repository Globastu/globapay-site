// Merchants component for platform view only

const MerchantsComponent = {
  currentPage: 1,
  itemsPerPage: 8,
  filteredMerchants: [...MOCK_MERCHANTS],

  render: function() {
    const totalPages = Math.ceil(this.filteredMerchants.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const currentMerchants = this.filteredMerchants.slice(startIndex, endIndex);

    return `
      <div class="page-header">
        <h1 class="page-title">Merchants</h1>
        <p class="page-subtitle">Manage and monitor your platform merchants</p>
      </div>

      <!-- Merchant Stats -->
      <div class="stats-grid mb-6">
        ${this.renderMerchantStats()}
      </div>

      <!-- Filters and Actions -->
      <div class="card mb-6">
        <div class="card-content">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            ${this.renderFilters()}
            <div class="flex space-x-2">
              <button class="btn btn-secondary">Export List</button>
              <button class="btn btn-primary">Add Merchant</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Merchants Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${currentMerchants.map(merchant => this.renderMerchantCard(merchant)).join('')}
      </div>

      <!-- Pagination -->
      <div class="mt-6">
        ${ComponentUtils.createPagination(this.currentPage, totalPages, 'MerchantsComponent.changePage')}
      </div>
    `;
  },

  renderMerchantStats: function() {
    const activeMerchants = MOCK_MERCHANTS.filter(m => m.status === 'active').length;
    const pendingMerchants = MOCK_MERCHANTS.filter(m => m.status === 'pending').length;
    const totalRevenue = MOCK_MERCHANTS.reduce((sum, m) => sum + m.totalRevenue, 0);
    const totalTransactions = MOCK_MERCHANTS.reduce((sum, m) => sum + m.transactionCount, 0);

    return `
      <div class="stat-card">
        <div class="stat-label">Total Merchants</div>
        <div class="stat-value">${MOCK_MERCHANTS.length}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          15% from last month
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Merchants</div>
        <div class="stat-value">${activeMerchants}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          ${((activeMerchants / MOCK_MERCHANTS.length) * 100).toFixed(1)}% active
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value">${formatCurrency(totalRevenue)}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          22% from last month
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending Reviews</div>
        <div class="stat-value">${pendingMerchants}</div>
        <div class="stat-change">
          ${ComponentUtils.createIcon('clock', 'w-4 h-4')}
          Require attention
        </div>
      </div>
    `;
  },

  renderFilters: function() {
    return `
      <div class="search-container">
        <div class="relative flex-1">
          ${ComponentUtils.createIcon('search', 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5')}
          <input 
            type="text" 
            placeholder="Search merchants..." 
            class="search-input pl-10"
            onkeyup="MerchantsComponent.handleSearch(event)"
          >
        </div>
        <select class="filter-select" onchange="MerchantsComponent.handleStatusFilter(event)">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
        <select class="filter-select" onchange="MerchantsComponent.handleCategoryFilter(event)">
          <option value="">All Categories</option>
          <option value="retail">Retail</option>
          <option value="technology">Technology</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>
    `;
  },

  renderMerchantCard: function(merchant) {
    const statusColor = DataUtils.getStatusColor(merchant.status);
    const joinedTime = formatRelativeTime(merchant.joinDate);

    return `
      <div class="merchant-card">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="merchant-avatar">
              ${merchant.name.charAt(0)}
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">${merchant.name}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">${merchant.email}</p>
            </div>
          </div>
          ${ComponentUtils.createStatusBadge(merchant.status)}
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</p>
            <p class="font-semibold text-gray-900 dark:text-white">${formatCurrency(merchant.totalRevenue)}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transactions</p>
            <p class="font-semibold text-gray-900 dark:text-white">${merchant.transactionCount}</p>
          </div>
        </div>
        
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500 dark:text-gray-400">Category</span>
            <span class="text-gray-900 dark:text-white capitalize">${merchant.category}</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500 dark:text-gray-400">Country</span>
            <span class="text-gray-900 dark:text-white">${merchant.country}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Joined</span>
            <span class="text-gray-900 dark:text-white">${joinedTime}</span>
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button 
            class="btn btn-secondary flex-1" 
            onclick="MerchantsComponent.viewMerchant('${merchant.id}')"
          >
            View Details
          </button>
          ${merchant.status === 'pending' ? `
            <button 
              class="btn btn-success" 
              onclick="MerchantsComponent.approveMerchant('${merchant.id}')"
              title="Approve Merchant"
            >
              ✓
            </button>
          ` : ''}
          <button 
            class="btn btn-secondary" 
            onclick="MerchantsComponent.showMerchantMenu('${merchant.id}')"
            title="More Actions"
          >
            ⋯
          </button>
        </div>
      </div>
    `;
  },

  handleSearch: function(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredMerchants = MOCK_MERCHANTS.filter(merchant => 
      merchant.name.toLowerCase().includes(searchTerm) ||
      merchant.email.toLowerCase().includes(searchTerm) ||
      merchant.id.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.refreshView();
  },

  handleStatusFilter: function(event) {
    const status = event.target.value;
    if (status) {
      this.filteredMerchants = MOCK_MERCHANTS.filter(m => m.status === status);
    } else {
      this.filteredMerchants = [...MOCK_MERCHANTS];
    }
    this.currentPage = 1;
    this.refreshView();
  },

  handleCategoryFilter: function(event) {
    const category = event.target.value;
    if (category) {
      this.filteredMerchants = MOCK_MERCHANTS.filter(m => m.category === category);
    } else {
      this.filteredMerchants = [...MOCK_MERCHANTS];
    }
    this.currentPage = 1;
    this.refreshView();
  },

  changePage: function(page) {
    this.currentPage = page;
    this.refreshView();
  },

  refreshView: function() {
    const content = document.getElementById('page-content');
    content.innerHTML = this.render();
  },

  viewMerchant: function(merchantId) {
    const merchant = MOCK_MERCHANTS.find(m => m.id === merchantId);
    if (merchant) {
      const transactions = DataUtils.filterTransactionsByMerchant(merchantId);
      alert(`Merchant Details:\n\nName: ${merchant.name}\nEmail: ${merchant.email}\nStatus: ${merchant.status}\nTotal Revenue: ${formatCurrency(merchant.totalRevenue)}\nTransactions: ${merchant.transactionCount}\nCategory: ${merchant.category}\nCountry: ${merchant.country}\nJoined: ${formatDate(merchant.joinDate)}\n\nRecent Transactions: ${transactions.length}\n\nIn a real app, this would open a detailed merchant dashboard.`);
    }
  },

  approveMerchant: function(merchantId) {
    const merchant = MOCK_MERCHANTS.find(m => m.id === merchantId);
    if (merchant && confirm(`Approve merchant "${merchant.name}"?`)) {
      // In a real app, this would make an API call
      merchant.status = 'active';
      this.refreshView();
      alert(`Merchant "${merchant.name}" has been approved and activated!`);
    }
  },

  showMerchantMenu: function(merchantId) {
    const merchant = MOCK_MERCHANTS.find(m => m.id === merchantId);
    if (merchant) {
      const actions = [
        'View Transactions',
        'Send Message',
        'Update Settings',
        'Generate Report',
        merchant.status === 'active' ? 'Suspend Account' : 'Activate Account',
        'Delete Merchant'
      ];
      
      const choice = prompt(`Actions for ${merchant.name}:\n\n${actions.map((action, index) => `${index + 1}. ${action}`).join('\n')}\n\nEnter number (1-${actions.length}):`);
      
      if (choice && !isNaN(choice) && choice >= 1 && choice <= actions.length) {
        const selectedAction = actions[choice - 1];
        alert(`Action: ${selectedAction}\n\nIn a real app, this would execute the selected action for ${merchant.name}.`);
      }
    }
  }
};