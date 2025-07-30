import { ContactForm } from '../types';

export class ContactPage {
  render(): string {
    return `
      <section class="contact-section">
        <div class="container">
          <div class="section-header">
            <h1>Contact Us</h1>
            <p>Ready to capture your special moments? Get in touch with us to discuss your photography needs.</p>
          </div>

          <div class="contact-content">
            <!-- Contact Information -->
            <div class="contact-info">
              <h2>Get In Touch</h2>
              
              <div class="contact-details">
                <div class="contact-item">
                  <div class="contact-icon">📧</div>
                  <div class="contact-text">
                    <h3>Email</h3>
                    <p>heartatlens@gmail.com</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">📞</div>
                  <div class="contact-text">
                    <h3>Phone</h3>
                    <p>+91-7097386546</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">📍</div>
                  <div class="contact-text">
                    <h3>Address</h3>
                    <p>Kandlakoya Village, Medchal<br>Hyderabad, Telangana 501401<br>India</p>
                    <a href="https://maps.app.goo.gl/yKhwHfhmHz6mHnYh7" target="_blank" class="maps-link">📍 View on Google Maps</a>
                  </div>
                </div>
              </div>

              <div class="social-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                  <a href="https://www.instagram.com/heartatlens/" target="_blank" class="social-link" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form-section">
              <h2>Send Us a Message</h2>
              
              <form id="contact-form" class="contact-form">
                <div class="form-group">
                  <label for="name">Name *</label>
                  <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea id="message" name="message" rows="6" required 
                            placeholder="Tell us about your photography needs, event details, preferred dates, and any specific requirements..."></textarea>
                </div>
                
                <button type="submit" class="btn-primary submit-btn">Send Message</button>
              </form>
              
              <div id="form-success" class="success-message hidden">
                <div class="message-content">
                  ✅ Thank you for your message! We'll get back to you within 24 hours.
                </div>
              </div>
              
              <div id="form-error" class="error-message hidden">
                <div class="message-content">
                  ❌ <span id="error-text">Please fill in all required fields.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const successDiv = document.getElementById('form-success');
    const errorDiv = document.getElementById('form-error');
    const errorText = document.getElementById('error-text');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hide previous messages
        successDiv?.classList.add('hidden');
        errorDiv?.classList.add('hidden');
        
        const formData = new FormData(form);
        const contactData: ContactForm = {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          subject: 'Contact Form Submission',
          message: formData.get('message') as string
        };
        
        // Basic validation
        if (!contactData.name || !contactData.email || !contactData.message) {
          if (errorText) {
            errorText.textContent = 'Please fill in all required fields.';
          }
          errorDiv?.classList.remove('hidden');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactData.email)) {
          if (errorText) {
            errorText.textContent = 'Please enter a valid email address.';
          }
          errorDiv?.classList.remove('hidden');
          return;
        }
        
        // Simulate form submission
        this.submitForm(contactData)
          .then(() => {
            successDiv?.classList.remove('hidden');
            form.reset();
          })
          .catch((error) => {
            if (errorText) {
              errorText.textContent = error.message || 'An error occurred. Please try again.';
            }
            errorDiv?.classList.remove('hidden');
          });
      });
    }
  }

  private async submitForm(data: ContactForm): Promise<void> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Contact form submitted:', data);
        
        // Simulate success (90% success rate)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error. Please try again.'));
        }
      }, 1000);
    });
  }
}