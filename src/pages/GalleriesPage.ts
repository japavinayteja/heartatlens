import { storage } from '../storage';
import { Gallery } from '../types';

export class GalleriesPage {
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
    const categorizedGalleries = {
      wedding: this.galleries.filter(g => g.category === 'wedding'),
      prewedding: this.galleries.filter(g => g.category === 'prewedding'),
      birthday: this.galleries.filter(g => g.category === 'birthday')
    };

    return `
      <div class="pt-16 bg-gray-50 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="text-center mb-16">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Client Galleries</h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our collection of beautiful moments captured across different occasions.
            </p>
          </div>

          ${this.galleries.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${this.galleries.map(gallery => `
                <div class="gallery-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group" data-gallery-id="${gallery.id}">
                  <div class="h-64 bg-gray-200 overflow-hidden relative">
                    ${gallery.images.length > 0 ? `
                      <img src="${gallery.images[0].thumbnail}" alt="${gallery.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    ` : `
                      <div class="w-full h-full flex items-center justify-center text-gray-400">
                        <div class="text-center">
                          <div class="text-6xl mb-4">📸</div>
                          <p>No photos yet</p>
                        </div>
                      </div>
                    `}
                    <div class="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                      ${gallery.category.charAt(0).toUpperCase() + gallery.category.slice(1).replace('prewedding', 'Pre-Wedding').replace('babyshower', 'Baby Shower')}
                    </div>
                  </div>
                  <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${gallery.name}</h3>
                    <p class="text-gray-600 mb-4">${gallery.images.length} photos</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        <span class="mr-2">🔒</span>
                        <span>Password protected</span>
                      </div>
                      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        📥 Access & Download
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-20">
              <div class="text-gray-400 mb-6">
                <div class="text-8xl mb-4">📸</div>
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-4">No Galleries Available</h3>
              <p class="text-gray-600 max-w-md mx-auto">
                Client galleries will appear here once they are created and made public.
              </p>
            </div>
          `}
        </div>
      </div>
    `;
  }

  private renderPasswordPrompt(): string {
    return `
      <div class="pt-16 bg-white min-h-screen">
        <div class="max-w-md mx-auto px-4 py-20">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-black mb-2">${this.selectedGallery?.name}</h2>
              <p class="text-gray-600">This gallery is password protected</p>
            </div>
            
            <form id="password-form" class="space-y-4">
              <div>
                <label for="gallery-password" class="block text-sm font-medium text-black mb-2">Enter Password</label>
                <input type="password" id="gallery-password" name="password" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
              </div>
              
              <div class="flex space-x-4">
                <button type="submit" class="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Access Gallery
                </button>
                <button type="button" id="back-btn" class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Back
                </button>
              </div>
            </form>
            
            <div id="password-error" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"></div>
          </div>
        </div>
      </div>
    `;
  }

  private renderGalleryView(): string {
    if (!this.selectedGallery) return '';

    return `
      <div class="pt-16 bg-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-black mb-2">${this.selectedGallery.name}</h1>
              <p class="text-gray-600">${this.selectedGallery.images.length} photos</p>
            </div>
            <div class="flex space-x-4">
              <button id="download-all-btn" class="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Download All
              </button>
              <button id="back-to-galleries-btn" class="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg transition-colors">
                Back to Galleries
              </button>
            </div>
          </div>

          ${this.selectedGallery.images.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 image-grid">
              ${this.selectedGallery.images.map(image => `
                <div class="gallery-image-item group cursor-pointer" data-image-url="${image.url}">
                  <div class="relative overflow-hidden rounded-lg shadow-lg">
                    <img src="${image.thumbnail}" alt="${image.filename}" 
                         class="service-image h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <button class="download-btn bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors" data-url="${image.url}" data-filename="${image.filename}">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </button>
                        <button class="view-btn bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors" data-url="${image.url}">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-20">
              <div class="text-gray-400 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="text-gray-600">No photos in this gallery yet.</p>
            </div>
          `}
        </div>
      </div>

      <!-- Image Modal -->
      <div id="image-modal" class="hidden fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div class="relative max-w-4xl max-h-full">
          <button id="close-modal" class="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <img id="modal-image" src="" alt="" class="max-w-full max-h-full object-contain rounded-lg">
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

    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.selectedGallery = null;
        this.isPasswordEntered = false;
        this.refreshPage();
      });
    }

    // Back to galleries button
    const backToGalleriesBtn = document.getElementById('back-to-galleries-btn');
    if (backToGalleriesBtn) {
      backToGalleriesBtn.addEventListener('click', () => {
        this.selectedGallery = null;
        this.isPasswordEntered = false;
        this.refreshPage();
      });
    }

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
          this.selectedGallery.images.forEach(image => {
            setTimeout(() => {
              this.downloadImage(image.url, image.filename);
            }, 100);
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
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'galleries' } }));
  }
}