// ===== Main Application Router =====
import { renderDashboard } from './views/dashboard.js';
import { renderProspecting } from './views/prospecting.js';
import { renderDeals } from './views/deals.js';
import { renderRetention } from './views/retention.js';
import { renderCompetitive } from './views/competitive.js';

const app = {
  currentView: 'dashboard',
  container: null,
  navItems: [],
  sidebar: null
};

function init() {
  app.container = document.getElementById('content-area');
  app.navItems = document.querySelectorAll('.nav-item');
  app.sidebar = document.getElementById('sidebar');

  // Router logic
  window.addEventListener('hashchange', handleRouteChange);

  // Initial route
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(hash);

  // Setup mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      app.sidebar.classList.toggle('open');
    });
  }

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
      app.sidebar.classList.contains('open') &&
      !app.sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)) {
      app.sidebar.classList.remove('open');
    }
  });
}

function handleRouteChange() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(hash);
}

function navigateTo(viewId) {
  // Update nav state
  app.navItems.forEach(item => {
    if (item.dataset.view === viewId) item.classList.add('active');
    else item.classList.remove('active');
  });

  // Ensure hash matches (if called directly)
  if (window.location.hash !== `#${viewId}`) {
    history.pushState(null, '', `#${viewId}`);
  }

  // Close mobile sidebar if open
  if (window.innerWidth <= 768 && app.sidebar) {
    app.sidebar.classList.remove('open');
  }

  app.currentView = viewId;
  app.container.innerHTML = '<div style="display:flex; justify-content:center; padding:100px;"><div class="ai-pulse" style="width:20px; height:20px;"></div></div>';

  // Small delay for transition effect
  setTimeout(() => {
    try {
      switch (viewId) {
        case 'dashboard': renderDashboard(app.container); break;
        case 'prospecting': renderProspecting(app.container); break;
        case 'deals': renderDeals(app.container); break;
        case 'retention': renderRetention(app.container); break;
        case 'competitive': renderCompetitive(app.container); break;
        default: renderDashboard(app.container); break;
      }
    } catch (e) {
      console.error(`Error rendering view ${viewId}:`, e);
      app.container.innerHTML = `<div style="padding:40px; color:var(--color-danger); background:var(--color-danger-bg); border-radius:var(--radius-md);">Error loading view: ${e.message}</div>`;
    }
  }, 50);
}

// Start app
document.addEventListener('DOMContentLoaded', init);
