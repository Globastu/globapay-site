// Settings component for both merchant and platform views

const SettingsComponent = {
  activeTab: 'general',

  render: function(demoType) {
    return `
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your ${demoType} account and preferences</p>
      </div>

      <!-- Settings Navigation -->
      <div class="card mb-6">
        <div class="card-content">
          <nav class="flex space-x-8 overflow-x-auto">
            ${this.renderSettingsNav(demoType)}
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          ${this.renderSettingsContent(demoType)}
        </div>
        <div>
          ${this.renderSettingsSidebar(demoType)}
        </div>
      </div>
    `;
  },

  renderSettingsNav: function(demoType) {
    const tabs = [
      { id: 'general', label: 'General', icon: 'settings' },
      { id: 'account', label: 'Account', icon: 'user' },
      { id: 'payments', label: 'Payments', icon: 'transactions' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'security', label: 'Security', icon: 'settings' }
    ];

    if (demoType === 'platform') {
      tabs.push({ id: 'platform', label: 'Platform', icon: 'merchants' });
    }

    return tabs.map(tab => {
      const isActive = this.activeTab === tab.id;
      return `
        <button 
          class="flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
            isActive 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }"
          onclick="SettingsComponent.switchTab('${tab.id}')"
        >
          ${ComponentUtils.createIcon(tab.icon, 'w-4 h-4')}
          <span>${tab.label}</span>
        </button>
      `;
    }).join('');
  },

  renderSettingsContent: function(demoType) {
    switch (this.activeTab) {
      case 'general':
        return this.renderGeneralSettings(demoType);
      case 'account':
        return this.renderAccountSettings(demoType);
      case 'payments':
        return this.renderPaymentSettings(demoType);
      case 'notifications':
        return this.renderNotificationSettings();
      case 'security':
        return this.renderSecuritySettings();
      case 'platform':
        return this.renderPlatformSettings();
      default:
        return this.renderGeneralSettings(demoType);
    }
  },

  renderGeneralSettings: function(demoType) {
    const config = DEMO_CONFIG[demoType];
    
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">General Settings</h3>
        </div>
        <div class="card-content">
          <form class="space-y-6">
            <div class="form-group">
              <label class="form-label">Business Name</label>
              <input 
                type="text" 
                class="form-input" 
                value="${config.merchantInfo ? config.merchantInfo.name : config.platformInfo.name}"
                placeholder="Enter business name"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Business Description</label>
              <textarea 
                class="form-input" 
                rows="3" 
                placeholder="Describe your business"
              >A leading ${demoType === 'merchant' ? 'e-commerce store' : 'payment platform'} providing excellent services to customers worldwide.</textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Industry</label>
                <select class="form-select">
                  <option>E-commerce</option>
                  <option>Technology</option>
                  <option>Retail</option>
                  <option>Services</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Business Size</label>
                <select class="form-select">
                  <option>Small (1-10 employees)</option>
                  <option>Medium (11-50 employees)</option>
                  <option>Large (51-200 employees)</option>
                  <option>Enterprise (200+ employees)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Time Zone</label>
              <select class="form-select">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (UTC)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3">
              <button type="button" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  renderAccountSettings: function(demoType) {
    return `
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Account Information</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-input" value="Demo" placeholder="First name">
                </div>
                
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-input" value="User" placeholder="Last name">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" value="demo@globapay.com" placeholder="Email address">
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-input" value="+1 (555) 123-4567" placeholder="Phone number">
              </div>

              <div class="flex justify-end space-x-3">
                <button type="button" class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Update Account</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Business Address</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="form-group">
                <label class="form-label">Street Address</label>
                <input type="text" class="form-input" value="123 Business Street" placeholder="Street address">
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input type="text" class="form-input" value="San Francisco" placeholder="City">
                </div>
                
                <div class="form-group">
                  <label class="form-label">State/Province</label>
                  <input type="text" class="form-input" value="California" placeholder="State">
                </div>
                
                <div class="form-group">
                  <label class="form-label">ZIP/Postal Code</label>
                  <input type="text" class="form-input" value="94105" placeholder="ZIP code">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Country</label>
                <select class="form-select">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>

              <div class="flex justify-end space-x-3">
                <button type="button" class="btn btn-secondary">Cancel</button>
                <button type="submit" class="btn btn-primary">Update Address</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderPaymentSettings: function(demoType) {
    return `
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Payment Methods</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                    💳
                  </div>
                  <div>
                    <p class="font-medium">Credit/Debit Cards</p>
                    <p class="text-sm text-gray-500">Accept Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <p class="font-medium">Digital Wallets</p>
                    <p class="text-sm text-gray-500">Apple Pay, Google Pay, PayPal</p>
                  </div>
                </div>
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center">
                    🏦
                  </div>
                  <div>
                    <p class="font-medium">Bank Transfers</p>
                    <p class="text-sm text-gray-500">ACH, Wire transfers, SEPA</p>
                  </div>
                </div>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Transaction Fees</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Credit Card Transactions</span>
                <span class="font-medium">2.9% + $0.30</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Digital Wallet Transactions</span>
                <span class="font-medium">2.5% + $0.25</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Bank Transfer Transactions</span>
                <span class="font-medium">0.8% (min $5.00)</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">International Transactions</span>
                <span class="font-medium">3.4% + $0.30</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Settlement Settings</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="form-group">
                <label class="form-label">Settlement Schedule</label>
                <select class="form-select">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Bank Account</label>
                <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p class="font-medium">•••• •••• •••• 4567</p>
                  <p class="text-sm text-gray-500">Bank of America - Checking</p>
                </div>
              </div>

              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Update Settings</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderNotificationSettings: function() {
    return `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Notification Preferences</h3>
        </div>
        <div class="card-content">
          <div class="space-y-6">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h4>
              <div class="space-y-3">
                ${this.renderNotificationOption('Transaction alerts', 'Get notified of new transactions', true)}
                ${this.renderNotificationOption('Failed payments', 'Alerts for payment failures', true)}
                ${this.renderNotificationOption('Weekly reports', 'Summary of weekly activity', false)}
                ${this.renderNotificationOption('Marketing updates', 'Product news and updates', false)}
              </div>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-4">SMS Notifications</h4>
              <div class="space-y-3">
                ${this.renderNotificationOption('High-value transactions', 'Transactions over $500', true)}
                ${this.renderNotificationOption('Security alerts', 'Account security notifications', true)}
                ${this.renderNotificationOption('System maintenance', 'Scheduled maintenance alerts', false)}
              </div>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h4>
              <div class="space-y-3">
                ${this.renderNotificationOption('Real-time transactions', 'Instant transaction updates', true)}
                ${this.renderNotificationOption('Daily summary', 'End of day summary', true)}
                ${this.renderNotificationOption('Promotional offers', 'Special offers and deals', false)}
              </div>
            </div>

            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderNotificationOption: function(title, description, checked = false) {
    return `
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="font-medium text-gray-900 dark:text-white">${title}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">${description}</p>
        </div>
        <label class="flex items-center ml-4">
          <input type="checkbox" ${checked ? 'checked' : ''} class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
        </label>
      </div>
    `;
  },

  renderSecuritySettings: function() {
    return `
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Password & Authentication</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="form-group">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-input" placeholder="Enter current password">
              </div>

              <div class="form-group">
                <label class="form-label">New Password</label>
                <input type="password" class="form-input" placeholder="Enter new password">
              </div>

              <div class="form-group">
                <label class="form-label">Confirm New Password</label>
                <input type="password" class="form-input" placeholder="Confirm new password">
              </div>

              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Two-Factor Authentication</h3>
          </div>
          <div class="card-content">
            <div class="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  ${ComponentUtils.createIcon('checkCircle', 'w-4 h-4 text-green-600')}
                </div>
                <div>
                  <p class="font-medium text-green-900 dark:text-green-100">2FA Enabled</p>
                  <p class="text-sm text-green-700 dark:text-green-300">Your account is protected with two-factor authentication</p>
                </div>
              </div>
              <button class="btn btn-secondary">Disable</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">API Keys</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p class="font-medium">Production API Key</p>
                  <p class="text-sm text-gray-500 font-mono">pk_live_••••••••••••••••</p>
                </div>
                <div class="flex space-x-2">
                  <button class="btn btn-secondary">Regenerate</button>
                  <button class="btn btn-secondary">View</button>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p class="font-medium">Test API Key</p>
                  <p class="text-sm text-gray-500 font-mono">pk_test_••••••••••••••••</p>
                </div>
                <div class="flex space-x-2">
                  <button class="btn btn-secondary">Regenerate</button>
                  <button class="btn btn-secondary">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderPlatformSettings: function() {
    return `
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Platform Configuration</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="form-group">
                <label class="form-label">Platform Name</label>
                <input type="text" class="form-input" value="Globapay Platform" placeholder="Platform name">
              </div>

              <div class="form-group">
                <label class="form-label">Platform Fee Structure</label>
                <select class="form-select">
                  <option>Percentage + Fixed</option>
                  <option>Percentage Only</option>
                  <option>Fixed Only</option>
                  <option>Tiered</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">Platform Fee (%)</label>
                  <input type="number" class="form-input" value="2.9" step="0.1" min="0" max="10">
                </div>
                
                <div class="form-group">
                  <label class="form-label">Fixed Fee ($)</label>
                  <input type="number" class="form-input" value="0.30" step="0.01" min="0">
                </div>
              </div>

              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Update Configuration</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Merchant Onboarding</h3>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Auto-approve new merchants</span>
                <label class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Require KYC verification</span>
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-blue-600">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700 dark:text-gray-300">Send welcome emails</span>
                <label class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300 text-blue-600">
                  <span class="ml-2 text-sm">Enabled</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">System Limits</h3>
          </div>
          <div class="card-content">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">Max Transaction Amount ($)</label>
                  <input type="number" class="form-input" value="10000" min="1">
                </div>
                
                <div class="form-group">
                  <label class="form-label">Daily Volume Limit ($)</label>
                  <input type="number" class="form-input" value="100000" min="1">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label">Max Merchants</label>
                  <input type="number" class="form-input" value="1000" min="1">
                </div>
                
                <div class="form-group">
                  <label class="form-label">API Rate Limit (req/min)</label>
                  <input type="number" class="form-input" value="1000" min="1">
                </div>
              </div>

              <div class="flex justify-end">
                <button type="submit" class="btn btn-primary">Update Limits</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderSettingsSidebar: function(demoType) {
    return `
      <div class="space-y-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Account Status</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Account Type</span>
                <span class="font-medium capitalize">${demoType}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Status</span>
                ${ComponentUtils.createStatusBadge('active')}
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Plan</span>
                <span class="font-medium">Professional</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-400">Billing</span>
                <span class="font-medium">Monthly</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Actions</h3>
          </div>
          <div class="card-content">
            <div class="space-y-2">
              <button class="btn btn-secondary w-full">Download Statement</button>
              <button class="btn btn-secondary w-full">Export Data</button>
              <button class="btn btn-secondary w-full">Contact Support</button>
              <button class="btn btn-danger w-full">Close Account</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Help & Support</h3>
          </div>
          <div class="card-content">
            <div class="space-y-3">
              <a href="#" class="block text-blue-600 hover:text-blue-800 text-sm">Documentation</a>
              <a href="#" class="block text-blue-600 hover:text-blue-800 text-sm">API Reference</a>
              <a href="#" class="block text-blue-600 hover:text-blue-800 text-sm">Community Forum</a>
              <a href="#" class="block text-blue-600 hover:text-blue-800 text-sm">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  switchTab: function(tabId) {
    this.activeTab = tabId;
    const content = document.getElementById('page-content');
    content.innerHTML = this.render(currentDemoType);
  }
};