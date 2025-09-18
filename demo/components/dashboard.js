// Dashboard component that mirrors the actual Globapay platform dashboard exactly

const DashboardComponent = {
  render: function(demoType) {
    const stats = this.getStatsData(demoType);
    const recentTransactions = DataUtils.getRecentTransactions(5);
    
    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>
            <p class="text-gray-600 dark:text-gray-400 mt-1">
              Welcome to your Globapay dashboard
            </p>
          </div>
          <button class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            ${createIcon('activity', 'w-4 h-4 mr-2')}
            View Reports
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          ${stats.map(stat => this.renderStatCard(stat)).join('')}
        </div>

        <!-- Charts -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Revenue Trend Chart -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            </div>
            <div class="p-6">
              <div id="revenue-chart"></div>
            </div>
          </div>

          <!-- Transaction Volume Chart -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800">
            <div class="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction Volume</h3>
            </div>
            <div class="p-6">
              <div id="volume-chart"></div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800">
          <div class="p-6 border-b border-gray-200 dark:border-gray-800">
            <div class="flex flex-row items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
              <button 
                onclick="router.navigate('transactions')"
                class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View all
              </button>
            </div>
          </div>
          <div class="p-6">
            ${this.renderRecentTransactions(recentTransactions, demoType)}
          </div>
        </div>
      </div>
    `;
  },

  getStatsData: function(demoType) {
    if (demoType === 'platform') {
      return [
        {
          title: 'Revenue Today',
          value: '$12,426',
          change: '+8.2%',
          changeType: 'increase',
          icon: 'dollarSign'
        },
        {
          title: 'Volume This Month',
          value: '2,847',
          change: '+15.3%',
          changeType: 'increase',
          icon: 'trendingUp'
        },
        {
          title: 'Active Merchants',
          value: '127',
          change: '+2',
          changeType: 'increase',
          icon: 'users'
        },
        {
          title: 'Alerts',
          value: '3',
          change: '-1',
          changeType: 'decrease',
          icon: 'alertTriangle'
        }
      ];
    } else {
      return [
        {
          title: 'Revenue Today',
          value: '$2,426',
          change: '+8.2%',
          changeType: 'increase',
          icon: 'dollarSign'
        },
        {
          title: 'Volume This Month',
          value: '847',
          change: '+15.3%',
          changeType: 'increase',
          icon: 'trendingUp'
        },
        {
          title: 'Success Rate',
          value: '98.5%',
          change: '+0.2%',
          changeType: 'increase',
          icon: 'checkCircle'
        },
        {
          title: 'Alerts',
          value: '1',
          change: '-2',
          changeType: 'decrease',
          icon: 'alertTriangle'
        }
      ];
    }
  },

  renderStatCard: function(stat) {
    const changeIcon = stat.changeType === 'increase' ? 'arrowUpRight' : 'arrowDownRight';
    const changeColor = stat.changeType === 'increase' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';

    return `
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                ${stat.title}
              </p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">
                ${stat.value}
              </p>
              <div class="flex items-center mt-1">
                ${createIcon(changeIcon, `w-4 h-4 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`)}
                <span class="text-sm font-medium ${changeColor}">
                  ${stat.change}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  vs last period
                </span>
              </div>
            </div>
            <div class="p-3 bg-primary/10 rounded-2xl">
              ${createIcon(stat.icon, 'w-6 h-6 text-primary')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initializeCharts: function() {
    // Initialize charts after the DOM is ready
    setTimeout(() => {
      if (window.ChartComponents && window.CHART_DATA) {
        ChartComponents.renderAreaChart('revenue-chart', CHART_DATA.revenueData);
        ChartComponents.renderBarChart('volume-chart', CHART_DATA.volumeData);
      }
    }, 100);
  },

  renderRecentTransactions: function(transactions, demoType) {
    if (transactions.length === 0) {
      return this.renderEmptyState('No recent transactions', 'Transactions will appear here as they are processed.');
    }

    return `
      <div class="space-y-4">
        ${transactions.map(transaction => `
          <div class="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onclick="DashboardComponent.showTransactionDetails('${transaction.id}')">
            <div class="flex items-center space-x-4">
              <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                ${createIcon('creditCard', 'w-4 h-4 text-gray-600 dark:text-gray-400')}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  ${transaction.merchantName || transaction.customer}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  ${transaction.id} • ${this.formatTime(transaction.date)}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  ${formatCurrency(transaction.amount, transaction.currency)}
                </p>
                ${this.getStatusBadge(transaction.status)}
              </div>
              <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" onclick="event.stopPropagation(); DashboardComponent.showTransactionMenu('${transaction.id}')">
                ${createIcon('moreHorizontal', 'w-4 h-4')}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  getStatusBadge: function(status) {
    switch (status) {
      case 'completed':
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300">Completed</span>';
      case 'pending':
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">Pending</span>';
      case 'failed':
        return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">Failed</span>';
      default:
        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">${status}</span>`;
    }
  },

  formatTime: function(dateString) {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  renderEmptyState: function(message, description = '') {
    return `
      <div class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="text-4xl text-gray-400 mb-4">📭</div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">${message}</h3>
          ${description ? `<p class="text-gray-500 dark:text-gray-400">${description}</p>` : ''}
        </div>
      </div>
    `;
  },

  showTransactionDetails: function(transactionId) {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
    if (transaction) {
      // Create a modal-like overlay
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
      overlay.onclick = (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      };

      const modal = document.createElement('div');
      modal.className = 'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800';
      modal.innerHTML = `
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction Details</h3>
          <button onclick="document.body.removeChild(this.closest('.fixed'))" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            ${createIcon('xCircle', 'w-5 h-5')}
          </button>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Transaction ID</span>
            <span class="font-medium text-gray-900 dark:text-white font-mono text-sm">${transaction.id}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Customer</span>
            <span class="font-medium text-gray-900 dark:text-white">${transaction.customer}</span>
          </div>
          ${transaction.merchantName ? `
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Merchant</span>
              <span class="font-medium text-gray-900 dark:text-white">${transaction.merchantName}</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Amount</span>
            <span class="font-medium text-gray-900 dark:text-white">${formatCurrency(transaction.amount, transaction.currency)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Status</span>
            ${this.getStatusBadge(transaction.status)}
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Payment Method</span>
            <span class="font-medium text-gray-900 dark:text-white">${transaction.method?.replace('_', ' ') || 'Credit Card'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Date</span>
            <span class="font-medium text-gray-900 dark:text-white">${formatDate(transaction.date)}</span>
          </div>
        </div>
        <div class="mt-6 flex space-x-3">
          ${transaction.status === 'completed' ? `
            <button class="btn btn-secondary flex-1" onclick="DashboardComponent.processRefund('${transaction.id}')">
              Process Refund
            </button>
          ` : ''}
          <button class="btn btn-primary flex-1" onclick="router.navigate('transactions')">
            View All Transactions
          </button>
        </div>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  },

  showTransactionMenu: function(transactionId) {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
    if (transaction) {
      const actions = [
        'View Details',
        'Copy Transaction ID',
        'Send Receipt',
        transaction.status === 'completed' ? 'Process Refund' : 'Retry Payment',
        'Report Issue'
      ];
      
      const choice = prompt(`Actions for transaction ${transaction.id}:\n\n${actions.map((action, index) => `${index + 1}. ${action}`).join('\n')}\n\nEnter number (1-${actions.length}):`);
      
      if (choice && !isNaN(choice) && choice >= 1 && choice <= actions.length) {
        const selectedAction = actions[choice - 1];
        
        switch (selectedAction) {
          case 'View Details':
            this.showTransactionDetails(transactionId);
            break;
          case 'Copy Transaction ID':
            navigator.clipboard.writeText(transaction.id);
            alert('Transaction ID copied to clipboard!');
            break;
          case 'Process Refund':
            this.processRefund(transactionId);
            break;
          default:
            alert(`Action: ${selectedAction}\n\nIn a real app, this would execute the selected action.`);
        }
      }
    }
  },

  processRefund: function(transactionId) {
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
    if (transaction && transaction.status === 'completed') {
      const refundAmount = prompt(`Process refund for ${transaction.customer}\n\nTransaction: ${formatCurrency(transaction.amount)}\nEnter refund amount (or leave blank for full refund):`, transaction.amount);
      
      if (refundAmount !== null) {
        const amount = refundAmount || transaction.amount;
        if (confirm(`Confirm refund of ${formatCurrency(parseFloat(amount))} to ${transaction.customer}?`)) {
          alert(`✅ Refund processed successfully!\n\nAmount: ${formatCurrency(parseFloat(amount))}\nCustomer: ${transaction.customer}\nTransaction: ${transaction.id}\n\nThe customer will receive their refund within 3-5 business days.`);
          
          // Close any open modals
          const modals = document.querySelectorAll('.fixed.inset-0');
          modals.forEach(modal => modal.remove());
        }
      }
    }
  }
};