import { storage } from '../storage';

export class HomePage {
  private getImageUrl(section: string, category?: string, defaultUrl?: string): string {
    const websiteImages = storage.getWebsiteImages();
    let image;
    
    if (section === 'services' && category) {
      image = websiteImages.find(img => img.section === 'services' && img.category === category);
    } else {
      const sectionImages = websiteImages.filter(img => img.section === section);
      image = sectionImages[Math.floor(Math.random() * sectionImages.length)];
    }
    
    return image ? image.url : defaultUrl || '';
  }

  render(): string {
    const heroImage = this.getImageUrl('hero', undefined, 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    const weddingImage = this.getImageUrl('services', 'wedding', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    const preweddingImage = this.getImageUrl('services', 'prewedding', 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    const birthdayImage = this.getImageUrl('services', 'birthday', 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    const babyshowerImage = this.getImageUrl('services', 'babyshower', 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    
    const recentWorkImages = storage.getWebsiteImages().filter(img => img.section === 'recent-work');
    const defaultRecentWork = [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160'
    ];

    return `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-image-container">
          <img src="${heroImage}" 
               alt="Professional Wedding Photography" 
               class="hero-image">
          <div class="hero-overlay">
            <div class="hero-content">
              <h1>Welcome to HeartAtLens</h1>
              <p>Where every heartbeat becomes a timeless memory. Capturing life's most precious moments with artistry, passion, and soul.</p>
              <div class="hero-buttons">
                <button class="btn-primary" data-page="gallery">View Gallery</button>
                <button class="btn-secondary" data-page="contact">Get In Touch</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="about-section">
        <div class="container">
          <div class="about-content">
            <h2>Professional Photography Services</h2>
            <p>With years of experience in capturing beautiful moments, we specialize in wedding photography, pre-wedding shoots, and birthday celebrations. Our passion lies in creating timeless images that tell your unique story.</p>
            
            <div class="services-grid">
              <div class="service-card">
                <div class="service-image-container">
                  <img src="${weddingImage}" 
                       alt="Wedding Photography" class="service-bg-image">
                  <div class="service-overlay"></div>
                </div>
                <h3>Wedding Photography</h3>
                <p>Complete wedding day coverage capturing every precious moment</p>
              </div>
              
              <div class="service-card">
                <div class="service-image-container">
                  <img src="${preweddingImage}" 
                       alt="Pre-Wedding Photography" class="service-bg-image">
                  <div class="service-overlay"></div>
                </div>
                <h3>Pre-Wedding Shoots</h3>
                <p>Romantic sessions celebrating your love story</p>
              </div>
              
              <div class="service-card">
                <div class="service-image-container">
                  <img src="${birthdayImage}" 
                       alt="Birthday Photography" class="service-bg-image">
                  <div class="service-overlay"></div>
                </div>
                <h3>Birthday Coverage</h3>
                <p>Joyful celebrations captured with creativity</p>
              </div>
              
              <div class="service-card">
                <div class="service-image-container">
                  <img src="${babyshowerImage}" 
                       alt="Baby Shower Photography" class="service-bg-image">
                  <div class="service-overlay"></div>
                </div>
                <h3>Baby Shower Events</h3>
                <p>Precious moments celebrating new life and motherhood</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery Preview Section -->
      <section class="gallery-preview-section">
        <div class="container">
          <h2>Recent Work</h2>
          <p>A glimpse into our latest photography sessions</p>
          
          <div class="preview-grid">
            ${(recentWorkImages.length > 0 ? recentWorkImages : defaultRecentWork.map((url, index) => ({
              url,
              filename: `Default Image ${index + 1}`,
              id: `default-${index}`
            }))).slice(0, 6).map((image, index) => `
              <div class="preview-item">
                <img src="${typeof image === 'string' ? image : image.url}" 
                     alt="Recent Photography Work ${index + 1}" class="preview-image">
              </div>
            `).join('')}
          </div>
          
          <div class="preview-cta">
            <button class="btn-primary" data-page="gallery">View Full Gallery</button>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = (e.target as HTMLElement).getAttribute('data-page');
        if (page) {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
        }
      });
    });
  }
}