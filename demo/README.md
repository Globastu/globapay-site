# Globapay Platform Demo

A standalone, fully-functional demo version of the Globapay payment platform that runs entirely in the browser with no external dependencies. Perfect for prospects to experience the platform without requiring registration or login.

## Overview

This demo provides two distinct experiences based on the URL parameter:

1. **Merchant Demo** (`?demo=merchant`) - Single-tenant view for merchants
2. **Platform Demo** (`?demo=platform`) - Multi-tenant view for platform partners

## Features Included

### Core Dashboard Components
- **Responsive sidebar navigation** with collapsible functionality
- **Modern topbar** with search, notifications, and theme toggle
- **Dark/light mode support** with system preference detection
- **Professional UI components** using Tailwind CSS

### Merchant Demo Features
- **Transaction Management**: View, filter, and search transactions
- **Payment Links**: Create and manage payment links
- **Invoicing**: Generate and track invoices
- **Reports & Analytics**: Revenue, success rates, transaction volumes
- **Settings**: Account configuration and preferences

### Platform Demo Features
- **Multi-tenant Management**: Onboard and manage merchants
- **Platform Analytics**: Cross-merchant reporting and insights
- **Billing Management**: Fee structures and revenue sharing
- **Merchant Oversight**: Monitor merchant performance
- **Advanced Settings**: Platform-wide configuration

### Data & Functionality
- **150+ sample transactions** with realistic data
- **Multiple payment methods**: Cards, bank transfers, wallets
- **Various transaction states**: Completed, pending, failed, refunded
- **Fraud detection simulation** with risk scores
- **Real-time filtering and search**
- **Responsive design** for all device sizes

## Installation Instructions

### 1. Copy Demo Files
Copy the entire `demo` folder to your target project:

```bash
cp -r demo/ /path/to/your/project/public/demo/
```

### 2. Create Demo Pages

#### For Next.js Projects:
Create a new page at `pages/demo.js` or `app/demo/page.js`:

```javascript
export default function DemoPage() {
  return (
    <iframe 
      src="/demo/index.html" 
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none' 
      }}
      title="Globapay Platform Demo"
    />
  );
}
```

#### For React Projects:
Add a route to your router:

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<DemoFrame />} />
      </Routes>
    </BrowserRouter>
  );
}

function DemoFrame() {
  return (
    <iframe 
      src="/demo/index.html" 
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none' 
      }}
      title="Globapay Platform Demo"
    />
  );
}
```

#### For Static Sites:
Simply link to the demo:

```html
<a href="/demo/index.html?demo=merchant">Try Merchant Demo</a>
<a href="/demo/index.html?demo=platform">Try Platform Demo</a>
```

### 3. CTA Implementation

#### Merchant-Focused CTAs:
```html
<a href="/demo?demo=merchant" class="btn btn-primary">
  Try Merchant Platform
</a>
```

#### Platform-Focused CTAs:
```html
<a href="/demo?demo=platform" class="btn btn-primary">
  Try Platform Solution
</a>
```

### 4. URL Parameters

The demo automatically detects the following URL parameters:

- `?demo=merchant` - Shows single-tenant merchant experience
- `?demo=platform` - Shows multi-tenant platform experience
- No parameter - Defaults to merchant demo

## File Structure

```
demo/
├── README.md                 # This file
├── index.html               # Main demo entry point
├── styles/
│   ├── main.css            # Core styles and Tailwind CSS
│   └── components.css      # Component-specific styles
├── scripts/
│   ├── main.js             # Core application logic
│   ├── data.js             # Dummy data generation
│   ├── components.js       # UI components
│   └── router.js           # Simple client-side routing
├── assets/
│   ├── icons/              # SVG icons and logos
│   └── images/             # Demo images and branding
└── components/
    ├── sidebar.js          # Navigation sidebar
    ├── topbar.js           # Top navigation bar
    ├── dashboard.js        # Dashboard overview
    ├── transactions.js     # Transaction management
    ├── merchants.js        # Merchant management (platform only)
    ├── reports.js          # Analytics and reporting
    └── settings.js         # Configuration settings
```

## Technical Details

### No External Dependencies
- **No CDN requirements** - All code is self-contained
- **No API calls** - Everything runs on local data
- **No authentication** - Immediate access to demo
- **No database** - Data stored in localStorage

### Browser Compatibility
- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- **Mobile responsive** design
- **Touch-friendly** interface
- **Keyboard navigation** support

### Performance
- **Fast loading** - Under 500KB total size
- **Smooth animations** using CSS transitions
- **Optimized images** in WebP format with fallbacks
- **Lazy loading** for improved performance

## Customization

### Branding
Edit `assets/icons/` and update CSS variables in `styles/main.css`:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --accent-color: #06b6d4;
}
```

### Data
Modify `scripts/data.js` to adjust:
- Transaction volumes and amounts
- Company names and details
- Date ranges and patterns
- Payment methods and currencies

### Features
Enable/disable features by editing `scripts/main.js`:

```javascript
const DEMO_CONFIG = {
  features: {
    invoicing: true,
    paymentLinks: true,
    fraudDetection: true,
    multiCurrency: true
  }
};
```

## Deployment Notes

### Static Hosting
Works perfectly with:
- **Netlify** - Drop folder and deploy
- **Vercel** - Add to public directory
- **GitHub Pages** - Commit to repository
- **AWS S3** - Upload as static website

### Security
- **No sensitive data** included
- **Read-only demo** - No data persistence
- **Safe for public access**
- **No server requirements**

## Support & Customization

### Common Modifications

1. **Change demo duration**: Edit session timeout in `main.js`
2. **Add custom pages**: Create new component files
3. **Modify navigation**: Update `components/sidebar.js`
4. **Change data volume**: Adjust generators in `data.js`

### Integration Examples

#### With marketing automation:
```javascript
// Track demo usage
window.demoStarted = function(type) {
  // Send to analytics
  gtag('event', 'demo_started', { demo_type: type });
};
```

#### With lead capture:
```javascript
// Optional email capture
window.captureLead = function(email, demoType) {
  // Send to CRM
  fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify({ email, demo_type: demoType })
  });
};
```

## Demo Flow

1. **User clicks CTA** with appropriate URL parameter
2. **Demo loads** with relevant tenant configuration
3. **User explores** full functionality with dummy data
4. **Session tracked** for analytics (optional)
5. **Lead capture** opportunity (optional)

## Maintenance

### Regular Updates
- **Sync with main platform** for UI consistency
- **Update dummy data** to reflect current trends
- **Test across browsers** monthly
- **Monitor performance** metrics

### Version Control
Tag demo versions to match main platform releases:
```bash
git tag demo-v1.0.0
```

This ensures your demo stays aligned with your production platform while remaining completely standalone and maintenance-free.