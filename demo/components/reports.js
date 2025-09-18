// Reports component for both merchant and platform views

const ReportsComponent = {
  selectedPeriod: 'month',
  selectedReport: 'revenue',

  render: function(demoType) {
    return `
      <div class="page-header">
        <h1 class="page-title">Reports & Analytics</h1>
        <p class="page-subtitle">View detailed insights and generate reports for your ${demoType} data</p>
      </div>

      <!-- Report Controls -->
      <div class="card mb-6">
        <div class="card-content">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex flex-wrap gap-4">
              <div>
                <label class="form-label">Report Type</label>
                <select class="form-select" onchange="ReportsComponent.handleReportChange(event)">
                  <option value="revenue">Revenue Analysis</option>
                  <option value="transactions">Transaction Summary</option>
                  <option value="customers">Customer Insights</option>
                  ${demoType === 'platform' ? '<option value="merchants">Merchant Performance</option>' : ''}
                  <option value="trends">Market Trends</option>
                </select>
              </div>
              <div>
                <label class="form-label">Time Period</label>
                <select class="form-select" onchange="ReportsComponent.handlePeriodChange(event)">
                  <option value="week">Last 7 Days</option>
                  <option value="month" selected>Last 30 Days</option>
                  <option value="quarter">Last 3 Months</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="btn btn-secondary">Export PDF</button>
              <button class="btn btn-secondary">Export CSV</button>
              <button class="btn btn-primary">Generate Report</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="stats-grid mb-6">
        ${this.renderKeyMetrics(demoType)}
      </div>

      <!-- Charts and Visualizations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        ${ComponentUtils.createChartPlaceholder('Revenue Trend', '350px')}
        ${ComponentUtils.createChartPlaceholder('Transaction Volume', '350px')}
      </div>

      <!-- Detailed Reports -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        ${this.renderDetailedReports(demoType)}
      </div>
    `;
  },

  renderKeyMetrics: function(demoType) {
    if (demoType === 'merchant') {
      return `
        <div class="stat-card">
          <div class="stat-label">Total Revenue (30d)</div>
          <div class="stat-value">${formatCurrency(15420.50)}</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            12.5% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Avg Order Value</div>
          <div class="stat-value">${formatCurrency(173.25)}</div>
          <div class="stat-change negative">
            ${ComponentUtils.createIcon('arrowDown', 'w-4 h-4')}
            5.2% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Conversion Rate</div>
          <div class="stat-value">3.8%</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            0.3% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Customer Retention</div>
          <div class="stat-value">68%</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            4.1% vs previous period
          </div>
        </div>
      `;
    } else {
      return `
        <div class="stat-card">
          <div class="stat-label">Platform Revenue (30d)</div>
          <div class="stat-value">${formatCurrency(62191.50)}</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            18.7% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Merchants</div>
          <div class="stat-value">142</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            8.3% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Transaction Volume</div>
          <div class="stat-value">2,847</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            22.1% vs previous period
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Platform Fee Revenue</div>
          <div class="stat-value">${formatCurrency(4,365.72)}</div>
          <div class="stat-change positive">
            ${ComponentUtils.createIcon('arrowUp', 'w-4 h-4')}
            15.9% vs previous period
          </div>
        </div>
      `;
    }
  },

  renderDetailedReports: function(demoType) {
    if (demoType === 'merchant') {
      return `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Revenue by Channel</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-700 dark:text-gray-300">Online Store</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(9250.30)}</div>
                  <div class="text-sm text-gray-500">60%</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-gray-700 dark:text-gray-300">Mobile App</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(4625.15)}</div>
                  <div class="text-sm text-gray-500">30%</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span class="text-gray-700 dark:text-gray-300">In-Person</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(1545.05)}</div>
                  <div class="text-sm text-gray-500">10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Top Products</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">Premium Widget</div>
                  <div class="text-sm text-gray-500">SKU: PW-001</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(2840.00)}</div>
                  <div class="text-sm text-gray-500">23 sold</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">Standard Package</div>
                  <div class="text-sm text-gray-500">SKU: SP-002</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(1950.00)}</div>
                  <div class="text-sm text-gray-500">39 sold</div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">Basic Plan</div>
                  <div class="text-sm text-gray-500">SKU: BP-003</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold">${formatCurrency(1260.00)}</div>
                  <div class="text-sm text-gray-500">42 sold</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Customer Geography</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">🇺🇸 United States</span>
                <span class="font-semibold">45%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">🇨🇦 Canada</span>
                <span class="font-semibold">28%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">🇬🇧 United Kingdom</span>
                <span class="font-semibold">16%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">🇦🇺 Australia</span>
                <span class="font-semibold">7%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">🌍 Others</span>
                <span class="font-semibold">4%</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Top Performing Merchants</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              ${MOCK_MERCHANTS.slice(0, 3).map((merchant, index) => `
                <div class="flex justify-between items-center">
                  <div class="flex items-center space-x-3">
                    <div class="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                      ${index + 1}
                    </div>
                    <div class="merchant-avatar text-xs">
                      ${merchant.name.charAt(0)}
                    </div>
                    <span class="text-gray-900 dark:text-white">${merchant.name}</span>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">${formatCurrency(merchant.totalRevenue)}</div>
                    <div class="text-sm text-gray-500">${merchant.transactionCount} txns</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Platform Growth</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-500">New Merchants (30d)</span>
                  <span class="font-medium">23</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 78%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-500">Transaction Growth</span>
                  <span class="font-medium">+22.1%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-500">Revenue Growth</span>
                  <span class="font-medium">+18.7%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 92%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Platform Health</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">API Uptime</span>
                <span class="font-semibold text-green-600">99.9%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Avg Response Time</span>
                <span class="font-semibold">127ms</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Success Rate</span>
                <span class="font-semibold text-green-600">96.8%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Support Tickets</span>
                <span class="font-semibold">3 open</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">System Load</span>
                <span class="font-semibold text-yellow-600">Medium</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  handleReportChange: function(event) {
    this.selectedReport = event.target.value;
    // In a real app, this would refresh the report data
    console.log(`Switched to ${this.selectedReport} report`);
  },

  handlePeriodChange: function(event) {
    this.selectedPeriod = event.target.value;
    
    if (this.selectedPeriod === 'custom') {
      const startDate = prompt('Enter start date (YYYY-MM-DD):');
      const endDate = prompt('Enter end date (YYYY-MM-DD):');
      
      if (startDate && endDate) {
        console.log(`Custom period: ${startDate} to ${endDate}`);
        // In a real app, this would update the report with custom date range
      } else {
        // Reset to previous selection if cancelled
        event.target.value = 'month';
        this.selectedPeriod = 'month';
      }
    }
    
    console.log(`Period changed to: ${this.selectedPeriod}`);
    // In a real app, this would refresh the report data
  }
};