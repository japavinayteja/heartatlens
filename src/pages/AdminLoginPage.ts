import { storage } from '../storage';

export class AdminLoginPage {
  render(): string {
    return `
      <section class="contact-section">
        <div class="container">
          <div class="section-header">
            <h1>Admin Dashboard</h1>
            <p>Access the administrative panel to manage galleries, upload photos, and control website content.</p>
          </div>

          <div class="contact-content">
            <!-- Admin Features Information -->
            <div class="contact-info">
              <h2>Dashboard Features</h2>
              
              <div class="contact-details">
                <div class="contact-item">
                  <div class="contact-icon">📁</div>
                  <div class="contact-text">
                    <h3>Gallery Management</h3>
                    <p>Create and manage client galleries organized by event type (weddings, pre-wedding, birthdays, baby showers)</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">📤</div>
                  <div class="contact-text">
                    <h3>Photo Upload & Management</h3>
                    <p>Add high-quality images to client galleries and remove unwanted photos with easy drag-and-drop functionality</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">🔒</div>
                  <div class="contact-text">
                    <h3>Password Protection</h3>
                    <p>Generate secure passwords for client gallery access and control gallery visibility settings</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">🖼️</div>
                  <div class="contact-text">
                    <h3>Website Content Management</h3>
                    <p>Update hero images, service photos, and recent work showcase to keep your website fresh and current</p>
                  </div>
                </div>
              </div>

              <div class="social-section">
                <h3>Admin Access</h3>
                <p class="text-gray-600 mb-4">Secure login required to access administrative features</p>
              </div>
            </div>

            <!-- Login Form Section -->
            <div class="contact-form-section">
              <h2>Admin Login</h2>
              
              <form id="loginForm" class="contact-form">
                <div class="form-group">
                  <label for="username">Username *</label>
                  <input type="text" id="username" name="username" required 
                         placeholder="Enter your admin username">
                </div>
                
                <div class="form-group">
                  <label for="password">Password *</label>
                  <input type="password" id="password" name="password" required 
                         placeholder="Enter your admin password">
                </div>
                
                <button type="submit" class="btn-primary submit-btn">Login to Dashboard</button>
              </form>
              
              <div id="form-success" class="success-message hidden">
                <div class="message-content">
                  ✅ Login successful! Redirecting to dashboard...
                </div>
              </div>
              
              <div id="form-error" class="error-message hidden">
                <div class="message-content">
                  ❌ <span id="error-text">Invalid username or password. Please try again.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    const successDiv = document.getElementById('form-success');
    const errorDiv = document.getElementById('form-error');
    const errorText = document.getElementById('error-text');
    
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide previous messages
        successDiv?.classList.add('hidden');
        errorDiv?.classList.add('hidden');
        
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        
        // Basic validation
        if (!username || !password) {
          if (errorText) {
            errorText.textContent = 'Please fill in all required fields.';
          }
          errorDiv?.classList.remove('hidden');
          return;
        }
        
        // Get admin from storage
        const admin = storage.getAdmin();
        
        if (admin && username === admin.username && password === admin.password) {
          // Show success message
          successDiv?.classList.remove('hidden');
          
          // Store authentication state and redirect after delay
          setTimeout(() => {
            storage.setCurrentAdmin(username);
            window.dispatchEvent(new CustomEvent('admin-login'));
            window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'admin' } }));
          }, 1000);
        } else {
          if (errorText) {
            errorText.textContent = 'Invalid username or password. Please try again.';
          }
          errorDiv?.classList.remove('hidden');
        }
      });
    }
  }
}