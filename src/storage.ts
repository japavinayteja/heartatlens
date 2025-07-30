import { Gallery, Admin } from './types';
import { WebsiteImage } from './types';

class LocalStorage {
  private readonly GALLERIES_KEY = 'heartatlens_galleries';
  private readonly ADMIN_KEY = 'heartatlens_admin';
  private readonly CURRENT_ADMIN_KEY = 'heartatlens_current_admin';
  private readonly WEBSITE_IMAGES_KEY = 'heartatlens_website_images';

  // Gallery management
  getGalleries(): Gallery[] {
    const stored = localStorage.getItem(this.GALLERIES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveGalleries(galleries: Gallery[]): void {
    try {
      const dataString = JSON.stringify(galleries);
      localStorage.setItem(this.GALLERIES_KEY, dataString);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        // Storage quota exceeded - show user-friendly error
        alert('Storage limit reached! Please delete some images or galleries to free up space. Large images take up significant storage space in the browser.');
        throw new Error('Storage quota exceeded. Please delete some content to free up space.');
      }
      throw error;
    }
  }

  addGallery(gallery: Gallery): void {
    const galleries = this.getGalleries();
    galleries.push(gallery);
    this.saveGalleries(galleries);
  }

  updateGallery(galleryId: string, updates: Partial<Gallery>): void {
    const galleries = this.getGalleries();
    const index = galleries.findIndex(g => g.id === galleryId);
    if (index !== -1) {
      galleries[index] = { ...galleries[index], ...updates };
      this.saveGalleries(galleries);
    }
  }

  deleteGallery(galleryId: string): void {
    const galleries = this.getGalleries();
    const filtered = galleries.filter(g => g.id !== galleryId);
    this.saveGalleries(filtered);
  }

  getGalleryById(id: string): Gallery | null {
    const galleries = this.getGalleries();
    return galleries.find(g => g.id === id) || null;
  }

  // Admin management
  getAdmin(): Admin | null {
    const stored = localStorage.getItem(this.ADMIN_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  saveAdmin(admin: Admin): void {
    try {
      localStorage.setItem(this.ADMIN_KEY, JSON.stringify(admin));
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Storage limit reached! Unable to save admin settings.');
        throw new Error('Storage quota exceeded.');
      }
      throw error;
    }
  }

  getCurrentAdmin(): string | null {
    return localStorage.getItem(this.CURRENT_ADMIN_KEY);
  }

  setCurrentAdmin(username: string): void {
    localStorage.setItem(this.CURRENT_ADMIN_KEY, username);
  }

  clearCurrentAdmin(): void {
    localStorage.removeItem(this.CURRENT_ADMIN_KEY);
  }

  // Website Images management
  getWebsiteImages(): WebsiteImage[] {
    const stored = localStorage.getItem(this.WEBSITE_IMAGES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveWebsiteImages(images: WebsiteImage[]): void {
    try {
      const dataString = JSON.stringify(images);
      localStorage.setItem(this.WEBSITE_IMAGES_KEY, dataString);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        alert('Storage limit reached! Please delete some website images to free up space.');
        throw new Error('Storage quota exceeded. Please delete some website images.');
      }
      throw error;
    }
  }

  addWebsiteImage(image: WebsiteImage): void {
    const images = this.getWebsiteImages();
    images.push(image);
    this.saveWebsiteImages(images);
  }

  updateWebsiteImage(imageId: string, updates: Partial<WebsiteImage>): void {
    const images = this.getWebsiteImages();
    const index = images.findIndex(img => img.id === imageId);
    if (index !== -1) {
      images[index] = { ...images[index], ...updates };
      this.saveWebsiteImages(images);
    }
  }

  deleteWebsiteImage(imageId: string): void {
    const images = this.getWebsiteImages();
    const filtered = images.filter(img => img.id !== imageId);
    this.saveWebsiteImages(filtered);
  }

  getWebsiteImagesBySection(section: string): WebsiteImage[] {
    const images = this.getWebsiteImages();
    return images.filter(img => img.section === section);
  }

  // Initialize default admin if none exists
  initializeDefaultAdmin(): void {
    // Always reset to ensure correct credentials
    this.saveAdmin({
      username: 'vnjapa',
      password: 'test123'
    });
  }
}

export const storage = new LocalStorage();