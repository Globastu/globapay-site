// Transactions component for both merchant and platform views

const TransactionsComponent = {
  currentPage: 1,
  itemsPerPage: 10,
  filteredTransactions: [...MOCK_TRANSACTIONS],

  render: function(demoType) {
    // Filter transactions for merchant view
    if (demoType === 'merchant') {
      this.filteredTransactions = DataUtils.filterTransactionsByMerchant('MERCH_001');
    } else {
      this.filteredTransactions = [...MOCK_TRANSACTIONS];
    }

    const totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const currentTransactions = this.filteredTransactions.slice(startIndex, endIndex);

    return `
      <div class="page-header">
        <h1 class="page-title">Transactions</h1>
        <p class="page-subtitle">View and manage ${demoType === 'merchant' ? 'your' : 'all'} payment transactions</p>
      </div>

      <!-- Stats Summary -->
      <div class="stats-grid mb-6">
        ${this.renderTransactionStats(demoType)}
      </div>

      <!-- Filters and Search -->
      <div class="card mb-6">
        <div class="card-content">
          ${this.renderFilters(demoType)}
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Transaction History</h3>
          <div class="flex space-x-2">
            <button class="btn btn-secondary">Export</button>
            <button class="btn btn-primary">Refresh</button>
          </div>
        </div>
        <div class="card-content">
          ${this.renderTransactionsTable(currentTransactions, demoType)}
          ${ComponentUtils.createPagination(this.currentPage, totalPages, 'TransactionsComponent.changePage')}
        </div>
      </div>
    `;
  },

  renderTransactionStats: function(demoType) {
    const stats = DataUtils.getTransactionStats(this.filteredTransactions);
    const totalAmount = this.filteredTransactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    return `
      <div class="stat-card">
        <div class="stat-label">Total Transactions</div>
        <div class="stat-value">${stats.total}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          12% from last period
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Successful</div>
        <div class="stat-value">${stats.completed}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          ${stats.successRate}% success rate
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending</div>
        <div class="stat-value">${stats.pending}</div>
        <div class="stat-change">
          ${ComponentUtils.createIcon('clock', 'w-4 h-4')}
          Awaiting processing
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total Volume</div>
        <div class="stat-value">${formatCurrency(totalAmount)}</div>
        <div class="stat-change positive">
          ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
          18% from last period
        </div>
      </div>
    `;
  },

  renderFilters: function(demoType) {
    return `
      <div class="search-container">
        <div class="relative flex-1">
          ${ComponentUtils.createIcon('search', 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5')}
          <input 
            type="text" 
            placeholder="Search transactions..." 
            class="search-input pl-10"
            onkeyup="TransactionsComponent.handleSearch(event)"
          >
        </div>
        <select class="filter-select" onchange="TransactionsComponent.handleStatusFilter(event)">
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="processing">Processing</option>
        </select>
        ${demoType === 'platform' ? `
          <select class="filter-select" onchange="TransactionsComponent.handleMerchantFilter(event)">
            <option value="">All Merchants</option>
            ${MOCK_MERCHANTS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
          </select>
        ` : ''}
        <select class="filter-select" onchange="TransactionsComponent.handleDateFilter(event)">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
    `;
  },

  renderTransactionsTable: function(transactions, demoType) {
    if (transactions.length === 0) {
      return ComponentUtils.createEmptyState(
        'No transactions found',
        'Try adjusting your filters or search criteria.'
      );
    }

    const showMerchantColumn = demoType === 'platform';

    return `
      <div class="table-container">
        <table class="table">
          <thead class="table-header">
            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              ${showMerchantColumn ? '<th>Merchant</th>' : ''}
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="table-body">
            ${transactions.map(transaction => this.renderTransactionRow(transaction, showMerchantColumn)).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderTransactionRow: function(transaction, showMerchantColumn) {
    const paymentMethodLabel = this.getPaymentMethodLabel(transaction.method, transaction.last4);
    
    return `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
        <td class="font-mono text-sm">${transaction.id}</td>
        <td>
          <div>
            <div class="font-medium">${transaction.customer}</div>
            <div class="text-xs text-gray-500">${transaction.type}</div>
          </div>
        </td>
        ${showMerchantColumn ? `
          <td>
            <div class="flex items-center space-x-2">
              <div class="merchant-avatar text-xs">
                ${transaction.merchantName.charAt(0)}
              </div>
              <span>${transaction.merchantName}</span>
            </div>
          </td>
        ` : ''}
        <td class="font-semibold">${formatCurrency(transaction.amount, transaction.currency)}</td>
        <td>
          <div class="text-sm">
            ${paymentMethodLabel}
          </div>
        </td>
        <td>
          ${ComponentUtils.createStatusBadge(transaction.status)}
        </td>
        <td>
          <div class="text-sm">
            ${formatDate(transaction.date)}
          </div>
          <div class="text-xs text-gray-500">
            ${formatRelativeTime(transaction.date)}
          </div>
        </td>
        <td>
          <div class="flex space-x-2">
            <button class="text-blue-600 hover:text-blue-800 text-sm font-medium" onclick="TransactionsComponent.viewDetails('${transaction.id}')">
              View
            </button>
            ${transaction.status === 'completed' ? `
              <button class="text-red-600 hover:text-red-800 text-sm font-medium" onclick="TransactionsComponent.processRefund('${transaction.id}')">
                Refund
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  },

  getPaymentMethodLabel: function(method, last4) {
    const methods = {
      'credit_card': 'Credit Card',
      'digital_wallet': 'Digital Wallet',
      'bank_transfer': 'Bank Transfer',
      'debit_card': 'Debit Card'
    };
    
    const label = methods[method] || method;
    return last4 ? `${label} •••• ${last4}` : label;
  },

  handleSearch: function(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => 
      transaction.customer.toLowerCase().includes(searchTerm) ||
      transaction.id.toLowerCase().includes(searchTerm) ||
      transaction.merchantName.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1;
    this.refreshTable();
  },

  handleStatusFilter: function(event) {
    const status = event.target.value;
    if (status) {
      this.filteredTransactions = MOCK_TRANSACTIONS.filter(t => t.status === status);
    } else {
      this.filteredTransactions = [...MOCK_TRANSACTIONS];
    }
    this.currentPage = 1;
    this.refreshTable();
  },

  handleMerchantFilter: function(event) {
    const merchantId = event.target.value;
    if (merchantId) {
      this.filteredTransactions = MOCK_TRANSACTIONS.filter(t => t.merchantId === merchantId);
    } else {
      this.filteredTransactions = [...MOCK_TRANSACTIONS];
    }
    this.currentPage = 1;
    this.refreshTable();
  },

  handleDateFilter: function(event) {
    const period = event.target.value;
    const now = new Date();
    
    if (period === 'today') {
      this.filteredTransactions = MOCK_TRANSACTIONS.filter(t => 
        t.date.toDateString() === now.toDateString()
      );
    } else if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      this.filteredTransactions = MOCK_TRANSACTIONS.filter(t => t.date >= weekAgo);
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      this.filteredTransactions = MOCK_TRANSACTIONS.filter(t => t.date >= monthAgo);
    } else {
      this.filteredTransactions = [...MOCK_TRANSACTIONS];
    }
    
    this.currentPage = 1;
    this.refreshTable();
  },

  changePage: function(page) {
    this.currentPage = page;
    this.refreshTable();
  },

  refreshTable: function() {
    // Re-render the transactions component
    const content = document.getElementById('page-content');
    content.innerHTML = this.render(currentDemoType);
  },

  viewDetails: function(transactionId) {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
    if (transaction) {
      alert(`Transaction Details:\n\nID: ${transaction.id}\nCustomer: ${transaction.customer}\nAmount: ${formatCurrency(transaction.amount)}\nStatus: ${transaction.status}\nDate: ${formatDate(transaction.date)}\n\nIn a real app, this would open a detailed view.`);
    }
  },

  processRefund: function(transactionId) {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
    if (transaction && confirm(`Process refund for ${formatCurrency(transaction.amount)} to ${transaction.customer}?`)) {
      alert('Refund processed successfully!\n\nIn a real app, this would initiate the actual refund process.');
    }
  }
};