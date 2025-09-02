import { storage } from '../storage';
import weddingServiceImg from '../assets/wedding-service.jpg';
import preweddingServiceImg from '../assets/prewedding-service.jpg';
import birthdayServiceImg from '../assets/birthday-service.jpg';
import babyshowerServiceImg from '../assets/babyshower-service.jpg';

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


  private getClientFolders(): any[] {
    const stored = localStorage.getItem('client_folders');
    console.log('Raw localStorage data:', stored);
    
    const clientFolders = stored ? JSON.parse(stored) : [];
    console.log('Parsed client folders:', clientFolders);
    
    // Filter folders that have photos
    const foldersWithPhotos = clientFolders.filter((folder: any) => {
      return folder.photos && folder.photos.length > 0;
    });
    
    console.log('Folders with photos:', foldersWithPhotos.length);
    return foldersWithPhotos.slice(0, 6); // Limit to 6 folders for display
  }

  render(): string {
    const heroImage = this.getImageUrl('hero', undefined, 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160');
    const weddingImage = this.getImageUrl('services', 'wedding', weddingServiceImg);
    const preweddingImage = this.getImageUrl('services', 'prewedding', preweddingServiceImg);
    const birthdayImage = this.getImageUrl('services', 'birthday', birthdayServiceImg);
    const babyshowerImage = this.getImageUrl('services', 'babyshower', babyshowerServiceImg);
    
    const clientFolders = this.getClientFolders();
    console.log('Client folders for display:', clientFolders);
    
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

      <!-- Recent Work Section -->
      <section class="gallery-preview-section">
        <div class="container">
          <h2>Recent Work</h2>
          <p class="text-left">A glimpse into our latest photography sessions</p>
          
          <div class="preview-grid">
            ${(() => {
              console.log('Rendering folders. Client folders available:', clientFolders.length);
              if (clientFolders.length > 0) {
                console.log('Showing client folders');
                const folders = clientFolders.slice(0, 5); // Show 5 folders to make room for follow button
                const folderItems = folders.map((folder, index) => `
                  <div class="preview-item folder-item" data-folder-index="${index}">
                    <img src="${folder.photos[0].data}" 
                         alt="Preview from ${folder.name} collection" 
                         class="preview-image folder-preview"
                         onerror="console.error('Failed to load folder preview:', '${folder.name}')">
                    <div class="folder-overlay">
                      <div class="folder-info">
                        <h3 class="folder-title">${folder.name}</h3>
                        <p class="photo-count">${folder.photos.length} ${folder.photos.length === 1 ? 'photo' : 'photos'}</p>
                      </div>
                      <div class="expand-icon">📁</div>
                    </div>
                  </div>
                `);
                
                // Insert follow button in the middle (after 2 items for 6-item grid)
                folderItems.splice(2, 0, `
                  <div class="preview-item follow-us-item">
                    <a href="https://www.instagram.com/heartatlens/" target="_blank" class="follow-us-button">
                      <div class="follow-us-content">
                        <svg class="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span class="follow-text">FOLLOW US</span>
                      </div>
                    </a>
                  </div>
                `);
                
                return folderItems.join('');
              } else {
                console.log('No client folders, showing default images');
                const images = defaultRecentWork.slice(0, 5).map((url, index) => `
                  <div class="preview-item thumbnail-item" data-photo-index="${index}" data-default="true">
                    <img src="${url}" 
                         alt="Recent Photography Work ${index + 1}" 
                         class="preview-image thumbnail-image">
                    <div class="photo-overlay">
                      <div class="expand-icon">🔍</div>
                    </div>
                  </div>
                `);
                
                // Insert follow button in the middle (after 2 items for 6-item grid)
                images.splice(2, 0, `
                  <div class="preview-item follow-us-item">
                    <a href="https://www.instagram.com/heartatlens/" target="_blank" class="follow-us-button">
                      <div class="follow-us-content">
                        <svg class="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span class="follow-text">FOLLOW US</span>
                      </div>
                    </a>
                  </div>
                `);
                
                return images.join('');
              }
            })()}
          </div>
        </div>
      </section>

      <!-- Folder Gallery Modal -->
      <div id="folder-modal" class="image-modal hidden">
        <div class="modal-backdrop"></div>
        <div class="modal-content folder-modal-content">
          <button class="modal-close">&times;</button>
          <div class="folder-modal-header">
            <h2 id="folder-modal-title"></h2>
            <p id="folder-modal-count"></p>
          </div>
          <div id="folder-modal-grid" class="folder-modal-grid">
          </div>
        </div>
      </div>
      <!-- Full Image Modal -->
      <div id="image-modal" class="image-modal hidden">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img id="modal-image" src="" alt="" class="modal-image">
          <div class="modal-info">
            <h3 id="modal-title"></h3>
            <p id="modal-description"></p>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners(): void {
    // Page navigation
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = (e.target as HTMLElement).getAttribute('data-page');
        if (page) {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
        }
      });
    });

    // Image and folder modal functionality
    const modal = document.getElementById('image-modal');
    const folderModal = document.getElementById('folder-modal');
    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    const folderModalTitle = document.getElementById('folder-modal-title');
    const folderModalCount = document.getElementById('folder-modal-count');
    const folderModalGrid = document.getElementById('folder-modal-grid');
    
    const clientFolders = this.getClientFolders();
    const defaultRecentWork = [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160',
      'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160'
    ];

    // Folder click handlers
    document.querySelectorAll('.folder-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-folder-index') || '0');
        const folder = clientFolders[index];
        
        if (folder) {
          folderModalTitle!.textContent = folder.name;
          folderModalCount!.textContent = `${folder.photos.length} ${folder.photos.length === 1 ? 'photo' : 'photos'}`;
          
          // Populate folder modal grid
          folderModalGrid!.innerHTML = folder.photos.map((photo: any, photoIndex: number) => `
            <div class="folder-modal-item" data-photo-src="${photo.data}">
              <img src="${photo.data}" alt="${photo.name}" class="folder-modal-image">
            </div>
          `).join('');
          
          // Add click handlers for individual photos in folder modal
          folderModalGrid!.querySelectorAll('.folder-modal-item').forEach(photoItem => {
            photoItem.addEventListener('click', (e) => {
              const photoSrc = (e.currentTarget as HTMLElement).getAttribute('data-photo-src');
              if (photoSrc) {
                modalImage.src = photoSrc;
                modalTitle!.textContent = folder.name;
                modalDescription!.textContent = 'Click to view full size';
                folderModal?.classList.add('hidden');
                modal?.classList.remove('hidden');
              }
            });
          });
          
          folderModal?.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close modal handlers
    const closeModal = () => {
      modal?.classList.add('hidden');
      folderModal?.classList.add('hidden');
      document.body.style.overflow = 'auto';
    };

    modalClose?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
}