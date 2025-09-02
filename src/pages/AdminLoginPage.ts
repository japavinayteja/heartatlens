export class AdminLoginPage {
  render(): string {
    return `
      <section class="admin-login-section">
        <div class="admin-login-container">
          <div class="admin-header">
            <h1>Admin Dashboard</h1>
            <p>Access the administrative panel to manage galleries, upload photos, and control website content.</p>
          </div>
          
          <div class="admin-content">
            <div class="admin-login-form-section">
              <h2>Admin Login</h2>
              
              <form id="admin-login-form" class="login-form">
                <div class="form-group">
                  <label for="username">Username <span class="required">*</span></label>
                  <input type="text" id="username" name="username" placeholder="Enter your admin username" required>
                </div>
                
                <div class="form-group">
                  <label for="password">Password <span class="required">*</span></label>
                  <input type="password" id="password" name="password" placeholder="Enter your admin password" required>
                </div>
                
                <button type="submit" class="login-dashboard-btn">Login to Dashboard</button>
              </form>
              
              <div id="login-error" class="error-message hidden">
                <span id="error-text">Invalid username or password</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    const form = document.getElementById('admin-login-form') as HTMLFormElement;
    const errorDiv = document.getElementById('login-error');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        
        // Check credentials
        if (username === 'vnjapa' && password === 'test123') {
          // Store admin session
          localStorage.setItem('admin_logged_in', 'true');
          
          // Dispatch admin login event
          window.dispatchEvent(new CustomEvent('admin-login'));
          
          // Navigate to admin dashboard
          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'admin' } }));
        } else {
          errorDiv?.classList.remove('hidden');
        }
      });
    }
  }
}