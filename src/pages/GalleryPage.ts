import { storage } from '../storage';
import { Gallery } from '../types';

export class GalleryPage {
  private galleries: Gallery[] = [];
  private selectedGallery: Gallery | null = null;
  private isPasswordEntered: boolean = false;

  constructor() {
    this.loadGalleries();
  }

  private loadGalleries(): void {
    this.galleries = storage.getGalleries().filter(g => g.isPublic);
  }

  render(): string {
    if (this.selectedGallery && this.isPasswordEntered) {
      return this.renderGalleryView();
    }

    if (this.selectedGallery && !this.isPasswordEntered) {
      return this.renderPasswordPrompt();
    }

    return this.renderGalleriesList();
  }

  private renderGalleriesList(): string {
    return `
      <section class="gallery-section">
        <div class="container">
          <div class="section-header">
            <h1>Client Galleries</h1>
            <p>Browse our collection of beautiful moments captured across different occasions</p>
          </div>

          ${this.galleries.length > 0 ? `
            <div class="gallery-grid">
              ${this.galleries.map(gallery => `
                <div class="gallery-card" data-gallery-id="${gallery.id}">
                  <div class="gallery-image-container">
                    ${gallery.images.length > 0 ? `
                      <img src="${gallery.images[0].thumbnail}" alt="${gallery.name}" class="gallery-image">
                    ` : `
                      <div class="gallery-placeholder">
                        <div class="placeholder-icon">📸</div>
                        <p>No photos yet</p>
                      </div>
                    `}
                    <div class="gallery-overlay">
                      <div class="gallery-info">
                        <span class="gallery-category">${gallery.category.charAt(0).toUpperCase() + gallery.category.slice(1).replace('prewedding', 'Pre-Wedding')}</span>
                        <div class="gallery-lock">🔒</div>
                      </div>
                    </div>
                  </div>
                  <div class="gallery-details">
                    <h3>${gallery.name}</h3>
                    <p>${gallery.images.length} photos</p>
                    <button class="btn-primary gallery-access-btn">Access & Download</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-icon">📸</div>
              <h3>No Galleries Available</h3>
              <p>Client galleries will appear here once they are created and made public.</p>
            </div>
          `}
        </div>
      </section>
    `;
  }

  private renderPasswordPrompt(): string {
    return `
      <section class="password-section">
        <div class="container">
          <div class="password-form-container">
            <div class="password-header">
              <h2>${this.selectedGallery?.name}</h2>
              <p>This gallery is password protected</p>
            </div>
            
            <form id="password-form" class="password-form">
              <div class="form-group">
                <label for="gallery-password">Enter Password</label>
                <input type="password" id="gallery-password" name="password" required>
              </div>
              
              <div class="form-buttons">
                <button type="submit" class="btn-primary">Access Gallery</button>
                <button type="button" id="back-btn" class="btn-secondary">Back</button>
              </div>
            </form>
            
            <div id="password-error" class="error-message hidden"></div>
          </div>
        </div>
      </section>
    `;
  }

  private renderGalleryView(): string {
    if (!this.selectedGallery) return '';

    return `
      <section class="gallery-view-section">
        <div class="container">
          <div class="gallery-header">
            <div class="gallery-title">
              <h1>${this.selectedGallery.name}</h1>
              <p>${this.selectedGallery.images.length} photos</p>
            </div>
            <div class="gallery-actions">
              <button id="download-all-btn" class="btn-primary">Download All</button>
              <button id="back-to-galleries-btn" class="btn-secondary">Back to Galleries</button>
            </div>
          </div>

          ${this.selectedGallery.images.length > 0 ? `
            <div class="images-grid">
              ${this.selectedGallery.images.map(image => `
                <div class="image-item">
                  <div class="image-container">
                    <img src="${image.thumbnail}" alt="${image.filename}" class="gallery-photo">
                    <div class="image-overlay">
                      <div class="image-actions">
                        <button class="action-btn download-btn" data-url="${image.url}" data-filename="${image.filename}">
                          ⬇️
                        </button>
                        <button class="action-btn view-btn" data-url="${image.url}">
                          👁️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-icon">📸</div>
              <p>No photos in this gallery yet.</p>
            </div>
          `}
        </div>
      </section>

      <!-- Image Modal -->
      <div id="image-modal" class="image-modal hidden">
        <div class="modal-content">
          <button id="close-modal" class="modal-close">✕</button>
          <img id="modal-image" src="" alt="" class="modal-image">
        </div>
      </div>
    `;
  }

  attachEventListeners(): void {
    // Gallery card clicks
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const galleryId = (e.currentTarget as HTMLElement).getAttribute('data-gallery-id');
        if (galleryId) {
          this.selectedGallery = storage.getGalleryById(galleryId);
          this.isPasswordEntered = false;
          this.refreshPage();
        }
      });
    });

    // Password form
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get('password') as string;
        
        if (this.selectedGallery && password === this.selectedGallery.password) {
          this.isPasswordEntered = true;
          this.refreshPage();
        } else {
          const errorDiv = document.getElementById('password-error');
          if (errorDiv) {
            errorDiv.textContent = 'Incorrect password. Please try again.';
            errorDiv.classList.remove('hidden');
          }
        }
      });
    }

    // Back buttons
    const backBtn = document.getElementById('back-btn');
    const backToGalleriesBtn = document.getElementById('back-to-galleries-btn');
    
    [backBtn, backToGalleriesBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.selectedGallery = null;
          this.isPasswordEntered = false;
          this.refreshPage();
        });
      }
    });

    // Download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = (e.currentTarget as HTMLElement).getAttribute('data-url');
        const filename = (e.currentTarget as HTMLElement).getAttribute('data-filename');
        if (url && filename) {
          this.downloadImage(url, filename);
        }
      });
    });

    // Download all button
    const downloadAllBtn = document.getElementById('download-all-btn');
    if (downloadAllBtn && this.selectedGallery) {
      downloadAllBtn.addEventListener('click', () => {
        if (this.selectedGallery) {
          this.selectedGallery.images.forEach((image, index) => {
            setTimeout(() => {
              this.downloadImage(image.url, image.filename);
            }, index * 100);
          });
        }
      });
    }

    // View buttons and modal
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = (e.currentTarget as HTMLElement).getAttribute('data-url');
        if (url) {
          this.showImageModal(url);
        }
      });
    });

    // Image modal
    const modal = document.getElementById('image-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal && modal) {
      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });
    }
    
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  private downloadImage(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private showImageModal(url: string): void {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    
    if (modal && modalImage) {
      modalImage.src = url;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  private refreshPage(): void {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'gallery' } }));
  }
}