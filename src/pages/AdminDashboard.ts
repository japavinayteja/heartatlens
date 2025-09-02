export class AdminDashboard {
  private currentView: 'folders' | 'upload' | 'manage' = 'folders';
  private clientFolders: any[] = [];
  private managingFolderId: string | null = null;

  constructor() {
    this.loadClientFolders();
  }

  private loadClientFolders(): void {
    const stored = localStorage.getItem('client_folders');
    this.clientFolders = stored ? JSON.parse(stored) : [];
  }

  private saveClientFolders(): void {
    try {
      const data = JSON.stringify(this.clientFolders);
      console.log('Attempting to save to localStorage. Data size:', data.length, 'bytes');
      localStorage.setItem('client_folders', data);
      console.log('Successfully saved to localStorage');
    } catch (error: any) {
      console.error('Failed to save to localStorage:', error);
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please delete some photos or folders to free up space.');
      }
      throw error;
    }
  }

  render(): string {
    switch (this.currentView) {
      case 'upload':
        return this.renderUploadView();
      case 'manage':
        return this.renderManageView();
      default:
        return this.renderFoldersView();
    }
  }

  private renderFoldersView(): string {
    return `
      <div class="admin-dashboard pt-28">
        <div class="admin-header">
          <div class="admin-header-content">
            <div class="admin-title">
              <h1>Client Photo Management</h1>
            </div>
            <div class="admin-actions">
              <button id="back-to-home-btn" class="btn-admin btn-admin-secondary">
                ← Back to Site
              </button>
            </div>
          </div>
        </div>
        
        <div class="admin-content">
          <div class="admin-card">
            <div class="admin-card-header">
              <h2>Client Folders</h2>
            </div>
            <div class="admin-card-body">
              <div class="button-group">
                <button id="create-folder-btn" class="btn-admin btn-admin-primary">
                  📁 Create New Client Folder
                </button>
                <button id="upload-photos-btn" class="btn-admin btn-admin-secondary">
                  📸 Upload Photos
                </button>
              </div>
              
              ${this.clientFolders.length > 0 ? `
                <div class="folders-grid">
                  ${this.clientFolders.map(folder => `
                    <div class="folder-card">
                      <div class="folder-header">
                        <h3 class="folder-title">${folder.name}</h3>
                        <button class="delete-folder-btn" data-folder-id="${folder.id}" title="Delete folder">
                          🗑️
                        </button>
                      </div>
                      <p class="folder-description">${folder.description || 'No description'}</p>
                      <div class="folder-footer">
                        <span class="photo-count">${folder.photos?.length || 0} photos</span>
                        <button class="btn-admin btn-admin-secondary btn-admin-small manage-folder-btn" data-folder-id="${folder.id}">
                          Manage
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="empty-state">
                  <div class="empty-state-icon">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7"></path>
                    </svg>
                  </div>
                  <h3>No Client Folders Yet</h3>
                  <p>Start organizing your client photos by creating folders for each client or project.</p>
                  <button id="create-first-folder-btn" class="btn-admin btn-admin-primary">
                    Create Your First Folder
                  </button>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderUploadView(): string {
    return `
      <div class="admin-dashboard pt-28">
        <div class="admin-header">
          <div class="admin-header-content">
            <div class="admin-title">
              <h1>Upload Client Photos</h1>
              <p>Add photos to client folders for display in recent work</p>
            </div>
            <div class="admin-actions">
              <button id="back-to-folders-btn" class="btn-admin btn-admin-secondary">
                Back to Folders
              </button>
            </div>
          </div>
        </div>
        
        <div class="admin-content">
          <div class="admin-card">
            <div class="admin-card-body">
              <form id="upload-form" class="upload-form">
                <div class="form-group">
                  <label for="folder-select" class="form-label">Select Client Folder</label>
                  <select id="folder-select" name="folderId" required class="form-select">
                    <option value="">Choose a folder...</option>
                    ${this.clientFolders.map(folder => {
                      console.log('Rendering folder option:', folder.name, 'ID:', folder.id);
                      return `<option value="${folder.id}">${folder.name}</option>`;
                    }).join('')}
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="photo-files" class="form-label">Select Photos</label>
                  <input type="file" id="photo-files" name="photos" multiple accept="image/*" required class="form-input">
                  <p class="form-help">Select multiple photos to upload</p>
                </div>
                
                <button type="submit" class="btn-admin btn-admin-primary" style="width: 100%;">
                  Upload Photos
                </button>
              </form>
              
              <div id="upload-progress" class="upload-progress hidden">
                <div class="progress-bar-container">
                  <div id="progress-bar" class="progress-bar" style="width: 0%"></div>
                </div>
                <p id="progress-text" class="progress-text">Uploading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderManageView(): string {
    const folder = this.clientFolders.find(f => f.id === this.managingFolderId);
    if (!folder) {
      return `<div class="admin-dashboard pt-28"><p>Folder not found</p></div>`;
    }

    return `
      <div class="admin-dashboard pt-28">
        <div class="admin-header">
          <div class="admin-header-content">
            <div class="admin-title">
              <h1>Manage Photos - ${folder.name}</h1>
            </div>
            <div class="admin-actions">
              <button id="back-to-folders-from-manage-btn" class="btn-admin btn-admin-secondary">
                Back to Folders
              </button>
            </div>
          </div>
        </div>
        
        <div class="admin-content">
          <div class="admin-card">
            <div class="admin-card-header">
              <h2>${folder.name} - ${folder.photos?.length || 0} Photos</h2>
            </div>
            <div class="admin-card-body">
              ${folder.photos && folder.photos.length > 0 ? `
                <div class="photos-management-grid">
                  ${folder.photos.map((photo: any, index: number) => `
                    <div class="photo-manage-item" data-photo-id="${photo.id}">
                      <div class="photo-preview">
                        <img src="${photo.data}" alt="${photo.name}" class="manage-photo-image">
                        <button class="delete-photo-btn-corner" data-folder-id="${folder.id}" data-photo-id="${photo.id}" title="Delete this photo">
                          🗑️
                        </button>
                      </div>
                      <div class="photo-info">
                        <p class="photo-name">${photo.name}</p>
                        <small class="photo-date">${new Date(photo.uploadedAt).toLocaleDateString()}</small>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="empty-state">
                  <div class="empty-state-icon">📸</div>
                  <h3>No Photos in This Folder</h3>
                  <p>Upload some photos to manage them here.</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners(): void {
    // Create folder button
    const createFolderBtn = document.getElementById('create-folder-btn') || document.getElementById('create-first-folder-btn');
    createFolderBtn?.addEventListener('click', () => {
      const name = prompt('Enter client folder name:');
      if (name) {
        const description = prompt('Enter folder description (optional):') || '';
        this.createFolder(name, description);
      }
    });

    // Upload photos button
    const uploadBtn = document.getElementById('upload-photos-btn');
    uploadBtn?.addEventListener('click', () => {
      this.currentView = 'upload';
      this.refresh();
    });

    // Back to folders button
    const backBtn = document.getElementById('back-to-folders-btn');
    backBtn?.addEventListener('click', () => {
      this.currentView = 'folders';
      this.refresh();
    });

    // Back to home button
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    backToHomeBtn?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-admin-btn');
    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem('admin_logged_in');
      window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
    });

    // Delete folder buttons
    document.querySelectorAll('.delete-folder-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const folderId = (e.target as HTMLElement).getAttribute('data-folder-id');
        if (folderId && confirm('Are you sure you want to delete this folder?')) {
          this.deleteFolder(folderId);
        }
      });
    });

    // Manage folder buttons
    document.querySelectorAll('.manage-folder-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const folderId = (e.target as HTMLElement).getAttribute('data-folder-id');
        if (folderId) {
          this.managingFolderId = folderId;
          this.currentView = 'manage';
          this.refresh();
        }
      });
    });

    // Back to folders from manage button
    const backFromManageBtn = document.getElementById('back-to-folders-from-manage-btn');
    backFromManageBtn?.addEventListener('click', () => {
      this.currentView = 'folders';
      this.managingFolderId = null;
      this.refresh();
    });

    // Delete photo buttons
    document.querySelectorAll('.delete-photo-btn-corner').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const folderId = (e.target as HTMLElement).getAttribute('data-folder-id');
        const photoId = (e.target as HTMLElement).getAttribute('data-photo-id');
        if (folderId && photoId && confirm('Are you sure you want to delete this photo?')) {
          this.deletePhoto(folderId, photoId);
        }
      });
    });

    // Upload form
    const uploadForm = document.getElementById('upload-form') as HTMLFormElement;
    uploadForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handlePhotoUpload(uploadForm);
    });
  }

  private createFolder(name: string, description: string): void {
    const folder = {
      id: Date.now().toString(),
      name,
      description,
      photos: [],
      createdAt: new Date()
    };

    this.clientFolders.push(folder);
    this.saveClientFolders();
    this.refresh();
  }

  private deleteFolder(folderId: string): void {
    this.clientFolders = this.clientFolders.filter(f => f.id !== folderId);
    this.saveClientFolders();
    this.refresh();
  }

  private deletePhoto(folderId: string, photoId: string): void {
    const folder = this.clientFolders.find(f => f.id === folderId);
    if (folder && folder.photos) {
      folder.photos = folder.photos.filter((photo: any) => photo.id !== photoId);
      this.saveClientFolders();
      this.refresh();
    }
  }

  private async handlePhotoUpload(form: HTMLFormElement): Promise<void> {
    const formData = new FormData(form);
    const folderId = formData.get('folderId') as string;
    const fileInput = form.querySelector('#photo-files') as HTMLInputElement;
    const files = fileInput?.files ? Array.from(fileInput.files) : [];

    console.log('Upload attempt - Folder ID:', folderId, 'Files count:', files.length);
    console.log('Available folders:', this.clientFolders.map(f => ({ id: f.id, name: f.name })));

    if (!folderId || files.length === 0) {
      alert('Please select a folder and at least one photo');
      return;
    }

    const progressDiv = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    progressDiv?.classList.remove('hidden');

    try {
      const folder = this.clientFolders.find(f => f.id === folderId);
      console.log('Selected folder:', folder);
      if (!folder) {
        console.error('Folder not found for ID:', folderId);
        throw new Error('Folder not found');
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = ((i + 1) / files.length) * 100;
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `Uploading ${i + 1}/${files.length} photos...`;

        // Convert file to base64 for localStorage
        const base64 = await this.fileToBase64(file);
        
        const photo = {
          id: Date.now().toString() + i,
          name: file.name,
          data: base64,
          uploadedAt: new Date()
        };

        folder.photos = folder.photos || [];
        folder.photos.push(photo);
        console.log('Added photo to folder:', photo.name, 'Base64 length:', base64.length);
      }

      this.saveClientFolders();
      console.log('Saved client folders to localStorage');
      
      if (progressText) progressText.textContent = 'Upload complete!';
      
      setTimeout(() => {
        progressDiv?.classList.add('hidden');
        this.currentView = 'folders';
        this.refresh();
        // Trigger a refresh of the home page if it's currently displayed
        const currentPage = window.location.hash || '#home';
        if (currentPage === '#home' || currentPage === '') {
          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'home' } }));
        }
      }, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
      progressDiv?.classList.add('hidden');
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('Converting file to base64:', file.name, 'Size:', file.size, 'bytes');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        console.log('Base64 conversion complete. Length:', result.length);
        resolve(result);
      };
      reader.onerror = error => {
        console.error('FileReader error:', error);
        reject(error);
      };
    });
  }

  private refresh(): void {
    const appElement = document.querySelector('#app .page-content');
    if (appElement) {
      appElement.innerHTML = this.render();
      this.attachEventListeners();
    }
  }
}