import { storage } from '../storage';

export class Navigation {
  private currentPage: string = 'home';
  private isAdminLoggedIn: boolean = false;

  constructor() {
    this.checkAdminStatus();
    this.render();
    this.attachEventListeners();
  }

  private checkAdminStatus(): void {
    this.isAdminLoggedIn = !!storage.getCurrentAdmin();
  }

  private render(): void {
    const nav = document.createElement('nav');
    nav.className = 'sticky-header';
    nav.innerHTML = `
      <div class="header-container">
        <!-- Site Logo/Name -->
        <div class="site-logo" data-page="home">
          <div class="logo-icon">
            <div class="heart-reflection">♥</div>
          </div>
          <div class="logo-text">
            <h1>Heart<span class="at-accent">At</span>Lens</h1>
            <p class="tagline">Capturing Life's Most Precious Moments</p>
          </div>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <a href="#" data-page="home" class="nav-link px-4 py-2">Home</a>
          <a href="#" data-page="gallery" class="nav-link px-4 py-2">Gallery</a>
          <a href="#" data-page="about" class="nav-link px-4 py-2">About</a>
          <a href="#" data-page="contact" class="nav-link px-4 py-2">Contact</a>
          ${this.isAdminLoggedIn 
            ? '<a href="#" data-page="admin" class="nav-link px-4 py-2">Admin</a><a href="#" id="logout-btn" class="nav-link logout-link px-4 py-2">Logout</a>'
            : '<a href="#" data-page="login" class="nav-link px-4 py-2">Admin</a>'
          }
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="mobile-menu-btn" id="mobile-menu-btn">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </div>
      </div>
      
      <!-- Mobile Navigation Menu -->
      <div id="mobile-menu" class="mobile-menu hidden">
        <a href="#" data-page="home" class="mobile-nav-link">Home</a>
        <a href="#" data-page="gallery" class="mobile-nav-link">Gallery</a>
        <a href="#" data-page="about" class="mobile-nav-link">About</a>
        <a href="#" data-page="contact" class="mobile-nav-link">Contact</a>
        ${this.isAdminLoggedIn 
          ? '<a href="#" data-page="admin" class="mobile-nav-link">Admin</a><a href="#" id="logout-btn-mobile" class="mobile-nav-link logout-link">Logout</a>'
          : '<a href="#" data-page="login" class="mobile-nav-link">Admin</a>'
        }
      </div>
    `;

    const existingNav = document.querySelector('nav');
    if (existingNav) {
      existingNav.replaceWith(nav);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  private attachEventListeners(): void {
    // Site logo click
    const siteLogo = document.querySelector('.site-logo');
    if (siteLogo) {
      siteLogo.addEventListener('click', () => {
        this.navigateTo('home');
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = (e.target as HTMLElement).getAttribute('data-page');
        if (page) {
          this.navigateTo(page);
          // Close mobile menu
          if (mobileMenu) {
            mobileMenu.classList.add('hidden');
          }
        }
      });
    });

    // Logout buttons
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    
    [logoutBtn, logoutBtnMobile].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.logout();
        });
      }
    });
  }

  private logout(): void {
    storage.clearCurrentAdmin();
    this.isAdminLoggedIn = false;
    this.render();
    this.attachEventListeners();
    this.navigateTo('home');
  }

  public navigateTo(page: string): void {
    this.currentPage = page;
    
    // Update active nav link
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === page) {
        link.classList.add('active');
      }
    });

    // Dispatch navigation event
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
  }

  public refresh(): void {
    this.checkAdminStatus();
    this.render();
    this.attachEventListeners();
  }
}