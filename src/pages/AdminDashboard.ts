import { storage } from '../storage';
import { Gallery, GalleryImage, WebsiteImage } from '../types';
import { generatePassword, generateId, formatDate } from '../utils';

export class AdminDashboard {
  private galleries: Gallery[] = [];
  private websiteImages: WebsiteImage[] = [];
  private selectedGallery: Gallery | null = null;
  private currentView: 'list' | 'create' | 'edit' | 'images' | 'website-images' = 'list';

  constructor() {
    this.loadGalleries();
    this.loadWebsiteImages();
  }

  private loadGalleries(): void {
    this.galleries = storage.getGalleries();
  }

  private loadWebsiteImages(): void {
    this.websiteImages = storage.getWebsiteImages();
  }

  render(): string {
    switch (this.currentView) {
      case 'create':
        return this.renderCreateGallery();
      case 'edit':
        return this.renderEditGallery();
      case 'images':
        return this.renderGalleryImages();
      case 'website-images':
        return this.renderWebsiteImages();
      default:
        return this.renderGalleriesList();
    }
  }

  private renderGalleriesList(): string {
    return `
      <div class="pt-20 bg-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="mb-8">
            <div class="text-center mb-6">
              <h1 class="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
              <p class="text-gray-600">Manage your photo galleries and website content</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <button id="create-gallery-btn" class="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg">
                📸 Create New Gallery
              </button>
              <button id="manage-website-images-btn" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg">
                🖼️ Manage Website Images
              </button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-black">All Galleries</h2>
            </div>
            
            ${this.galleries.length > 0 ? `
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Gallery</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">Category</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Photos</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">Password</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Status</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Created</th>
                      <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    ${this.galleries.map(gallery => `
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-black">${gallery.name}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex justify-center">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            gallery.category === 'wedding' ? 'bg-pink-100 text-pink-800' :
                            gallery.category === 'prewedding' ? 'bg-purple-100 text-purple-800' :
                            gallery.category === 'birthday' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                            }">
                            ${gallery.category.charAt(0).toUpperCase() + gallery.category.slice(1).replace('prewedding', 'Pre-Wedding').replace('babyshower', 'Baby Shower')}
                            </span>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          ${gallery.images.length}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex justify-center">
                            <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">${gallery.password}</code>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex justify-center">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            gallery.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }">
                            ${gallery.isPublic ? 'Public' : 'Private'}
                            </span>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          ${formatDate(new Date(gallery.createdAt))}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <div class="flex items-center justify-start space-x-3">
                            <button class="manage-images-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors" data-gallery-id="${gallery.id}">
                              Manage Images
                            </button>
                            <button class="edit-gallery-btn bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors" data-gallery-id="${gallery.id}">
                              Edit
                            </button>
                            <button class="delete-gallery-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors" data-gallery-id="${gallery.id}">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                </table>
              </div>
            ` : `
              <div class="text-center py-20">
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">No Galleries Created Yet</h3>
                <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">Start building your photography portfolio by creating your first client gallery.</p>
                <button id="create-first-gallery-btn" class="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
                  Create Your First Gallery
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  private renderWebsiteImages(): string {

    return `
      <div class="pt-20 bg-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-black mb-2">Website Images Management</h1>
              <p class="text-gray-600">Upload and manage images for different sections of your website</p>
            </div>
            <button id="back-to-list-btn" class="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
              Back to Dashboard
            </button>
          </div>

          <!-- Upload Button -->
          <div class="mb-6">
            <button class="upload-section-btn bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors" data-section="hero">
              Upload Images
            </button>
          </div>

          <!-- Images Display -->
          <div class="bg-white">
            ${this.websiteImages.length > 0 ? `
              <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                ${this.websiteImages.map(image => `
                  <div class="relative group">
                    <img src="${image.url}" alt="${image.filename}" class="w-16 h-16 object-cover rounded border">
                    <button class="delete-website-image-btn absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity" data-image-id="${image.id}">
                      ×
                    </button>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-center py-8 text-gray-500">
                <p>No images uploaded yet.</p>
              </div>
            `}
          </div>

          <!-- Hidden File Input -->
          <input type="file" id="website-image-upload" multiple accept="image/*" class="hidden">
        </div>
      </div>
    `;
  }

  private renderCreateGallery(): string {
    return `
      <div class="pt-20 bg-white min-h-screen">
        <div class="max-w-2xl mx-auto px-4 py-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <h1 class="text-xl font-bold text-black">Create New Gallery</h1>
              <button id="back-to-list-btn" class="text-gray-600 hover:text-black">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form id="create-gallery-form" class="space-y-6">
              <div>
                <label for="gallery-name" class="block text-sm font-medium text-black mb-2">Gallery Name</label>
                <input type="text" id="gallery-name" name="name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                       placeholder="e.g., Sarah & John's Wedding">
              </div>
              
              <div>
                <label for="gallery-category" class="block text-sm font-medium text-black mb-2">Category</label>
                <select id="gallery-category" name="category" required 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                  <option value="">Select a category</option>
                  <option value="wedding">Wedding</option>
                  <option value="prewedding">Pre-Wedding</option>
                  <option value="birthday">Birthday</option>
                </select>
              </div>
              
              <div>
                <label for="gallery-password" class="block text-sm font-medium text-black mb-2">Gallery Password</label>
                <div class="flex space-x-2">
                  <input type="text" id="gallery-password" name="password" required 
                         class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                         value="${generatePassword()}">
                  <button type="button" id="generate-password-btn" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition-colors">
                    Generate
                  </button>
                </div>
                <p class="text-sm text-gray-500 mt-1">Clients will need this password to download photos</p>
              </div>
              
              <div>
                <label class="flex items-center">
                  <input type="checkbox" id="gallery-public" name="isPublic" checked 
                         class="rounded border-gray-300 text-black focus:ring-black">
                  <span class="ml-2 text-sm text-black">Make gallery publicly visible</span>
                </label>
                <p class="text-sm text-gray-500 mt-1">Public galleries appear on the galleries page</p>
              </div>
              
              <div class="flex space-x-4">
                <button type="submit" class="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Create Gallery
                </button>
                <button type="button" id="cancel-create-btn" class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  private renderEditGallery(): string {
    if (!this.selectedGallery) return '';

    return `
      <div class="pt-20 bg-white min-h-screen">
        <div class="max-w-2xl mx-auto px-4 py-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="flex items-center justify-between mb-8">
              <h1 class="text-xl font-bold text-black">Edit Gallery</h1>
              <button id="back-to-list-btn" class="text-gray-600 hover:text-black">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form id="edit-gallery-form" class="space-y-6">
              <div>
                <label for="edit-gallery-name" class="block text-sm font-medium text-black mb-2">Gallery Name</label>
                <input type="text" id="edit-gallery-name" name="name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                       value="${this.selectedGallery.name}">
              </div>
              
              <div>
                <label for="edit-gallery-category" class="block text-sm font-medium text-black mb-2">Category</label>
                <select id="edit-gallery-category" name="category" required 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                  <option value="wedding" ${this.selectedGallery.category === 'wedding' ? 'selected' : ''}>Wedding</option>
                  <option value="prewedding" ${this.selectedGallery.category === 'prewedding' ? 'selected' : ''}>Pre-Wedding</option>
                  <option value="birthday" ${this.selectedGallery.category === 'birthday' ? 'selected' : ''}>Birthday</option>
                </select>
              </div>
              
              <div>
                <label for="edit-gallery-password" class="block text-sm font-medium text-black mb-2">Gallery Password</label>
                <div class="flex space-x-2">
                  <input type="text" id="edit-gallery-password" name="password" required 
                         class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                         value="${this.selectedGallery.password}">
                  <button type="button" id="generate-password-btn" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition-colors">
                    Generate
                  </button>
                </div>
              </div>
              
              <div>
                <label class="flex items-center">
                  <input type="checkbox" id="edit-gallery-public" name="isPublic" ${this.selectedGallery.isPublic ? 'checked' : ''} 
                         class="rounded border-gray-300 text-black focus:ring-black">
                  <span class="ml-2 text-sm text-black">Make gallery publicly visible</span>
                </label>
              </div>
              
              <div class="flex space-x-4">
                <button type="submit" class="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Update Gallery
                </button>
                <button type="button" id="cancel-edit-btn" class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  private renderGalleryImages(): string {
    if (!this.selectedGallery) return '';

    return `
      <div class="pt-20 bg-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold text-black mb-2">${this.selectedGallery.name}</h1>
              <p class="text-gray-600">${this.selectedGallery.images.length} photos</p>
            </div>
            <div class="flex space-x-4">
              <button id="upload-images-btn" class="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Upload Images
              </button>
              <button id="back-to-list-btn" class="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                Back to Galleries
              </button>
            </div>
          </div>

          <!-- Upload Area -->
          <div id="upload-area" class="hidden mb-8 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-black hover:bg-gray-50 transition-colors">
            <input type="file" id="image-upload" multiple accept="image/*" class="hidden">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <p class="text-gray-600 mb-4">Click here, drag and drop images, or use the button below</p>
            <button type="button" id="select-files-btn" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors">
              Select Files
            </button>
          </div>

          ${this.selectedGallery.images.length > 0 ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 image-grid">
              ${this.selectedGallery.images.map(image => `
                <div class="relative group">
                  <div class="aspect-square overflow-hidden rounded-lg shadow-lg">
                    <img src="${image.thumbnail}" alt="${image.filename}" 
                         class="service-image h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  </div>
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button class="delete-image-btn bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors" data-image-id="${image.id}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="mt-2 text-sm text-gray-600 truncate">${image.filename}</div>
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
              <p class="text-gray-600 mb-4">No images uploaded yet.</p>
              <button id="upload-first-images-btn" class="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Upload Your First Images
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  attachEventListeners(): void {
    // Create gallery button
    const createGalleryBtn = document.getElementById('create-gallery-btn');
    const createFirstGalleryBtn = document.getElementById('create-first-gallery-btn');
    
    [createGalleryBtn, createFirstGalleryBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.currentView = 'create';
          this.refreshPage();
        });
      }
    });

    // Manage website images button
    const manageWebsiteImagesBtn = document.getElementById('manage-website-images-btn');
    if (manageWebsiteImagesBtn) {
      manageWebsiteImagesBtn.addEventListener('click', () => {
        this.currentView = 'website-images';
        this.refreshPage();
      });
    }

    // Back to list buttons
    document.querySelectorAll('#back-to-list-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = 'list';
        this.selectedGallery = null;
        this.refreshPage();
      });
    });

    // Create gallery form
    const createForm = document.getElementById('create-gallery-form');
    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateGallery(e.target as HTMLFormElement);
      });
    }

    // Edit gallery form
    const editForm = document.getElementById('edit-gallery-form');
    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEditGallery(e.target as HTMLFormElement);
      });
    }

    // Generate password buttons
    document.querySelectorAll('#generate-password-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const passwordInput = btn.parentElement?.querySelector('input[name="password"]') as HTMLInputElement;
        if (passwordInput) {
          passwordInput.value = generatePassword();
        }
      });
    });

    // Cancel buttons
    document.querySelectorAll('#cancel-create-btn, #cancel-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentView = 'list';
        this.selectedGallery = null;
        this.refreshPage();
      });
    });

    // Gallery action buttons
    document.querySelectorAll('.manage-images-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const galleryId = (e.target as HTMLElement).getAttribute('data-gallery-id');
        if (galleryId) {
          this.selectedGallery = storage.getGalleryById(galleryId);
          this.currentView = 'images';
          this.refreshPage();
        }
      });
    });

    document.querySelectorAll('.edit-gallery-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const galleryId = (e.target as HTMLElement).getAttribute('data-gallery-id');
        if (galleryId) {
          this.selectedGallery = storage.getGalleryById(galleryId);
          this.currentView = 'edit';
          this.refreshPage();
        }
      });
    });

    document.querySelectorAll('.delete-gallery-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const galleryId = (e.target as HTMLElement).getAttribute('data-gallery-id');
        if (galleryId && confirm('Are you sure you want to delete this gallery? This action cannot be undone.')) {
          storage.deleteGallery(galleryId);
          this.loadGalleries();
          this.refreshPage();
        }
      });
    });

    // Image upload functionality
    this.attachImageUploadListeners();

    // Website image management
    this.attachWebsiteImageListeners();
  }

  private attachImageUploadListeners(): void {
    const uploadBtn = document.getElementById('upload-images-btn');
    const uploadFirstBtn = document.getElementById('upload-first-images-btn');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    const selectFilesBtn = document.getElementById('select-files-btn');

    [uploadBtn, uploadFirstBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (uploadArea) {
            uploadArea.classList.toggle('hidden');
          }
          // Also trigger file input directly if upload area is not available
          if (!uploadArea && fileInput) {
            fileInput.click();
          }
        });
      }
    });

    if (selectFilesBtn && fileInput) {
      selectFilesBtn.addEventListener('click', () => {
        fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          this.handleImageUpload(Array.from(files));
          // Reset file input so same files can be selected again
          fileInput.value = '';
        }
      });
    }

    // Drag and drop
    if (uploadArea) {
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-black', 'bg-gray-50');
      });

      uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-black', 'bg-gray-50');
      });

      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-black', 'bg-gray-50');
        
        const files = Array.from(e.dataTransfer?.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (imageFiles.length > 0) {
          this.handleImageUpload(imageFiles);
        }
      });

      // Make upload area clickable
      uploadArea.addEventListener('click', () => {
        if (fileInput) {
          fileInput.click();
        }
      });
    }

    // Delete image buttons
    document.querySelectorAll('.delete-image-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imageId = (e.currentTarget as HTMLElement).getAttribute('data-image-id');
        if (imageId && this.selectedGallery && confirm('Are you sure you want to delete this image?')) {
          this.selectedGallery.images = this.selectedGallery.images.filter(img => img.id !== imageId);
          storage.updateGallery(this.selectedGallery.id, { images: this.selectedGallery.images });
          this.loadGalleries(); // Reload galleries to get updated data
          this.refreshPage();
        }
      });
    });
  }

  private attachWebsiteImageListeners(): void {
    const fileInput = document.getElementById('website-image-upload') as HTMLInputElement;

    // Upload section buttons (hero, recent-work)
    document.querySelectorAll('.upload-section-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (fileInput) fileInput.click();
      });
    });

    // File input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          this.handleWebsiteImageUpload(Array.from(files), 'hero');
        }
      });
    }

    // Delete website image buttons
    document.querySelectorAll('.delete-website-image-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imageId = (e.currentTarget as HTMLElement).getAttribute('data-image-id');
        if (imageId && confirm('Are you sure you want to delete this image?')) {
          storage.deleteWebsiteImage(imageId);
          this.loadWebsiteImages();
          this.refreshPage();
        }
      });
    });
  }

  private handleWebsiteImageUpload(files: File[], section: string, category?: string): void {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        const image: WebsiteImage = {
          id: generateId(),
          section: section as 'hero' | 'services' | 'recent-work',
          category: category,
          url: imageUrl,
          filename: file.name,
          uploadedAt: new Date()
        };

        try {
          storage.addWebsiteImage(image);
          this.loadWebsiteImages();
          this.refreshPage();
        } catch (error) {
          console.error('Failed to save website image:', error);
          alert('Failed to upload website image: Storage limit reached. Try uploading smaller images or delete some existing content.');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  private handleCreateGallery(form: HTMLFormElement): void {
    const formData = new FormData(form);
    
    const gallery: Gallery = {
      id: generateId(),
      name: formData.get('name') as string,
      category: formData.get('category') as 'wedding' | 'prewedding' | 'birthday',
      password: formData.get('password') as string,
      isPublic: formData.has('isPublic'),
      images: [],
      createdAt: new Date()
    };

    storage.addGallery(gallery);
    this.loadGalleries();
    this.currentView = 'list';
    this.refreshPage();
  }

  private handleEditGallery(form: HTMLFormElement): void {
    if (!this.selectedGallery) return;

    const formData = new FormData(form);
    
    const updates = {
      name: formData.get('name') as string,
      category: formData.get('category') as 'wedding' | 'prewedding' | 'birthday',
      password: formData.get('password') as string,
      isPublic: formData.has('isPublic')
    };

    storage.updateGallery(this.selectedGallery.id, updates);
    this.loadGalleries();
    this.currentView = 'list';
    this.selectedGallery = null;
    this.refreshPage();
  }

  private handleImageUpload(files: File[]): void {
    if (!this.selectedGallery) return;

    console.log('Uploading files:', files.length); // Debug log

    files.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.warn('Skipping non-image file:', file.name);
        return;
      }

      console.log('Processing file:', file.name); // Debug log

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        console.log('Image loaded, creating gallery image'); // Debug log
        
        const image: GalleryImage = {
          id: generateId(),
          url: imageUrl,
          thumbnail: imageUrl, // In a real app, you'd generate thumbnails
          filename: file.name,
          uploadedAt: new Date()
        };

        if (this.selectedGallery) {
          try {
            this.selectedGallery.images.push(image);
            storage.updateGallery(this.selectedGallery.id, { images: this.selectedGallery.images });
            this.loadGalleries(); // Reload galleries to get updated data
            console.log('Image added to gallery, refreshing page'); // Debug log
            this.refreshPage();
          } catch (error) {
            // Remove the image from memory if storage failed
            this.selectedGallery.images.pop();
            console.error('Failed to save image:', error);
            alert('Failed to upload image: Storage limit reached. Try uploading smaller images or delete some existing content.');
          }
        }
      };
      
      reader.onerror = (e) => {
        console.error('Error reading file:', file.name, e);
      };
      
      reader.readAsDataURL(file);
    });

    // Hide upload area after upload
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
      uploadArea.classList.add('hidden');
    }
  }

  private refreshPage(): void {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'admin' } }));
  }
}