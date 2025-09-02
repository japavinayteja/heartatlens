import { WebsiteImage } from './types';

class LocalStorage {
  private readonly WEBSITE_IMAGES_KEY = 'heartatlens_website_images';

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

}

export const storage = new LocalStorage();