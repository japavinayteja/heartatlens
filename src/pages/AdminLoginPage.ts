import { storage } from '../storage';

export class AdminLoginPage {
  render(): string {
    return `
      <div class="pt-16 bg-white min-h-screen">
        <div class="max-w-md mx-auto px-4 py-20">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="text-center mb-8">
              <h1 class="text-xl font-bold text-black mb-2">Admin Login</h1>
              <p class="text-gray-600">Access the admin dashboard</p>
            </div>
            
            <form id="login-form" class="space-y-6">
              <div>
                <label for="username" class="block text-sm font-medium text-black mb-2">Username</label>
                <input type="text" id="username" name="username" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
              </div>
              
              <div>
                <label for="password" class="block text-sm font-medium text-black mb-2">Password</label>
                <input type="password" id="password" name="password" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
              </div>
              
              <button type="submit" 
                      class="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Login
              </button>
            </form>
            
            <div id="login-error" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Invalid username or password.
            </div>
            
            <div class="mt-6 p-4 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-600 mb-2"><strong>Demo Credentials:</strong></p>
              <p class="text-sm text-gray-600">Username: <code class="bg-gray-200 px-1 rounded">vnjapa</code></p>
              <p class="text-sm text-gray-600">Password: <code class="bg-gray-200 px-1 rounded">test123</code></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners(): void {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        
        const admin = storage.getAdmin();
        
        if (admin && username === admin.username && password === admin.password) {
          storage.setCurrentAdmin(username);
          window.dispatchEvent(new CustomEvent('admin-login'));
          window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'admin' } }));
        } else {
          if (errorDiv) {
            errorDiv.classList.remove('hidden');
          }
        }
      });
    }
  }
}