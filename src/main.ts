import './style.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { storage } from './storage';
import { disableRightClick } from './utils';

class App {
  private navigation: Navigation;
  private footer: Footer;
  private currentPage: string = 'home';
  private pages: { [key: string]: any } = {};

  constructor() {
    // Initialize default admin and disable right-click
    storage.initializeDefaultAdmin();
    disableRightClick();

    // Initialize navigation
    this.navigation = new Navigation();
    this.footer = new Footer();

    // Initialize pages
    this.pages = {
      home: new HomePage(),
      about: new AboutPage(),
      gallery: new GalleryPage(),
      contact: new ContactPage(),
      admin: new AdminDashboard(),
      login: new AdminLoginPage(),
      privacy: new PrivacyPage(),
      terms: new TermsPage(),
      faqs: new FAQPage()
    };

    // Set up event listeners
    this.setupEventListeners();

    // Render initial page
    this.renderPage('home');
  }

  private setupEventListeners(): void {
    // Navigation events
    window.addEventListener('navigate', (e: any) => {
      this.renderPage(e.detail.page);
    });

    // Admin login event
    window.addEventListener('admin-login', () => {
      this.navigation.refresh();
    });
  }

  private renderPage(page: string): void {
    this.currentPage = page;
    
    // Check admin access
    if (page === 'admin' && !storage.getCurrentAdmin()) {
      // Redirect to login if trying to access admin without authentication
      this.renderPage('login');
      return;
    }
    
    const pageInstance = this.pages[page];
    if (pageInstance) {
      const content = pageInstance.render();
      const appElement = document.querySelector('#app');
      if (appElement) {
        const footerContent = this.footer.render();
        appElement.innerHTML = `
          <div class="page-content">
            ${content}
          </div>
          ${footerContent}
        `;
        
        // Attach page-specific event listeners
        if (pageInstance.attachEventListeners) {
          pageInstance.attachEventListeners();
        }
        
        // Attach footer event listeners
        this.footer.attachEventListeners();
      }
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new App();
});