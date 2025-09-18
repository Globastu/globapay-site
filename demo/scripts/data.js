// Dummy data for Globapay Platform Demo
// This file contains all the mock data used throughout the demo

// Demo configuration
const DEMO_CONFIG = {
  merchant: {
    name: 'Merchant Dashboard',
    type: 'single-tenant',
    features: ['transactions', 'reports', 'settings'],
    merchantInfo: {
      name: 'Example Store',
      id: 'MERCH_001',
      status: 'active'
    }
  },
  platform: {
    name: 'Platform Dashboard',
    type: 'multi-tenant',
    features: ['merchants', 'transactions', 'reports', 'settings'],
    platformInfo: {
      name: 'Payment Platform',
      id: 'PLAT_001',
      merchantCount: 156
    }
  }
};

// Mock transaction data
const MOCK_TRANSACTIONS = [
  {
    id: 'TXN_001',
    amount: 125.50,
    currency: 'USD',
    status: 'completed',
    customer: 'John Doe',
    merchantId: 'MERCH_001',
    merchantName: 'Example Store',
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'payment',
    method: 'credit_card',
    last4: '4242'
  },
  {
    id: 'TXN_002',
    amount: 89.99,
    currency: 'USD',
    status: 'pending',
    customer: 'Jane Smith',
    merchantId: 'MERCH_002',
    merchantName: 'Tech Gadgets',
    date: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    type: 'payment',
    method: 'digital_wallet',
    last4: null
  },
  {
    id: 'TXN_003',
    amount: 250.00,
    currency: 'USD',
    status: 'failed',
    customer: 'Bob Johnson',
    merchantId: 'MERCH_001',
    merchantName: 'Example Store',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'payment',
    method: 'credit_card',
    last4: '5555'
  },
  {
    id: 'TXN_004',
    amount: 45.75,
    currency: 'USD',
    status: 'completed',
    customer: 'Alice Brown',
    merchantId: 'MERCH_003',
    merchantName: 'Fashion Boutique',
    date: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    type: 'payment',
    method: 'bank_transfer',
    last4: null
  },
  {
    id: 'TXN_005',
    amount: 175.25,
    currency: 'USD',
    status: 'completed',
    customer: 'Charlie Wilson',
    merchantId: 'MERCH_002',
    merchantName: 'Tech Gadgets',
    date: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    type: 'refund',
    method: 'credit_card',
    last4: '1234'
  }
];

// Mock merchant data
const MOCK_MERCHANTS = [
  {
    id: 'MERCH_001',
    name: 'Example Store',
    email: 'contact@examplestore.com',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    totalRevenue: 15420.50,
    transactionCount: 89,
    category: 'retail',
    country: 'US'
  },
  {
    id: 'MERCH_002',
    name: 'Tech Gadgets',
    email: 'info@techgadgets.com',
    status: 'active',
    joinDate: new Date('2023-03-22'),
    totalRevenue: 28950.75,
    transactionCount: 156,
    category: 'technology',
    country: 'CA'
  },
  {
    id: 'MERCH_003',
    name: 'Fashion Boutique',
    email: 'hello@fashionboutique.com',
    status: 'pending',
    joinDate: new Date('2024-01-08'),
    totalRevenue: 5240.25,
    transactionCount: 23,
    category: 'fashion',
    country: 'UK'
  },
  {
    id: 'MERCH_004',
    name: 'Home & Garden',
    email: 'support@homeandgarden.com',
    status: 'suspended',
    joinDate: new Date('2022-11-30'),
    totalRevenue: 12580.00,
    transactionCount: 67,
    category: 'home',
    country: 'AU'
  }
];

// Mock statistics data
const MOCK_STATS = {
  merchant: {
    totalRevenue: 15420.50,
    transactionCount: 89,
    successRate: 94.2,
    avgTransactionValue: 173.25,
    revenueChange: 12.5,
    transactionChange: 8.3,
    successRateChange: 2.1,
    avgValueChange: -5.2
  },
  platform: {
    totalRevenue: 62191.50,
    merchantCount: 156,
    transactionCount: 335,
    successRate: 96.8,
    revenueChange: 18.7,
    merchantChange: 15.2,
    transactionChange: 22.1,
    successRateChange: 1.8
  }
};

// Mock chart data
const MOCK_CHART_DATA = {
  revenue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    merchant: [1200, 1850, 2100, 1950, 2400, 2650],
    platform: [8500, 9200, 10100, 9800, 11200, 12400]
  },
  transactions: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    merchant: [12, 19, 15, 22, 18, 8, 6],
    platform: [89, 156, 134, 178, 145, 67, 45]
  }
};

// Utility functions for data manipulation
const DataUtils = {
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },

  formatRelativeTime: (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  },

  getStatusColor: (status) => {
    const colors = {
      completed: 'success',
      pending: 'pending',
      failed: 'failed',
      processing: 'processing',
      active: 'success',
      suspended: 'failed'
    };
    return colors[status] || 'pending';
  },

  filterTransactionsByMerchant: (merchantId) => {
    return MOCK_TRANSACTIONS.filter(txn => txn.merchantId === merchantId);
  },

  getRecentTransactions: (limit = 10) => {
    return MOCK_TRANSACTIONS
      .sort((a, b) => b.date - a.date)
      .slice(0, limit);
  },

  getTransactionStats: (transactions = MOCK_TRANSACTIONS) => {
    const total = transactions.length;
    const completed = transactions.filter(t => t.status === 'completed').length;
    const pending = transactions.filter(t => t.status === 'pending').length;
    const failed = transactions.filter(t => t.status === 'failed').length;
    
    return {
      total,
      completed,
      pending,
      failed,
      successRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
    };
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEMO_CONFIG,
    MOCK_TRANSACTIONS,
    MOCK_MERCHANTS,
    MOCK_STATS,
    MOCK_CHART_DATA,
    DataUtils
  };
}