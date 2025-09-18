// Main initialization script for Globapay Demo

let currentDemoType = null;

function initializeDemo() {
  // Determine demo type from URL
  const urlParams = new URLSearchParams(window.location.search);
  currentDemoType = urlParams.get('demo') === 'platform' ? 'platform' : 'merchant';
  
  // Initialize theme
  initializeTheme();
  
  // Initialize components
  initializeSidebar();
  initializeTopbar();
  
  // Show the app and hide loading
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
  }, 1000);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

function initializeSidebar() {
  const desktopSidebar = document.getElementById('sidebar');
  const mobileSidebar = document.querySelector('#mobile-sidebar .flex.h-full');
  
  if (desktopSidebar) {
    desktopSidebar.innerHTML = SidebarComponent.render(currentDemoType);
  }
  if (mobileSidebar) {
    mobileSidebar.innerHTML = SidebarComponent.render(currentDemoType);
  }
}

function initializeTopbar() {
  const topbar = document.getElementById('topbar');
  if (topbar) {
    topbar.innerHTML = TopbarComponent.render(currentDemoType);
  }
}

// Handle window resize
window.addEventListener('resize', function() {
  const sidebar = document.getElementById('mobile-sidebar');
  const overlay = document.getElementById('mobile-overlay');
  
  if (window.innerWidth >= 1024) {
    sidebar.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});

// Close mobile menu when clicking overlay
document.addEventListener('click', function(e) {
  if (e.target.id === 'mobile-overlay') {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // ESC to close mobile menu
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (!sidebar.classList.contains('hidden')) {
      sidebar.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
  
  // Ctrl/Cmd + K for quick navigation (placeholder)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // In a real app, this would open a command palette
    console.log('Quick navigation shortcut pressed');
  }
});