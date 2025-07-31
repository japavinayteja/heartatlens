export class AboutPage {
  render(): string {
    return `
      <section class="contact-section">
        <div class="container">
          <div class="section-header">
            <h1>About HeartAtLens</h1>
            <p>Professional photography services capturing life's most precious moments with artistry, passion, and soul.</p>
          </div>

          <div class="contact-content">
            <!-- Our Story Section -->
            <div class="contact-info">
              <h2>Our Story</h2>
              
              <div class="contact-details">
                <div class="contact-item">
                  <div class="contact-icon">📸</div>
                  <div class="contact-text">
                    <h3>Professional Experience</h3>
                    <p>With 2 years of dedicated experience in professional photography, HeartAtLens has developed a unique style that combines artistic vision with technical expertise.</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">💝</div>
                  <div class="contact-text">
                    <h3>Our Specialization</h3>
                    <p>Specializing in weddings, pre-wedding shoots, and birthday celebrations, we believe in capturing authentic emotions and creating timeless memories.</p>
                  </div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">🎯</div>
                  <div class="contact-text">
                    <h3>Our Mission</h3>
                    <p>Every photograph tells a story, and our mission is to preserve those precious moments that you'll treasure for a lifetime.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Photography Philosophy Section -->
            <div class="contact-form-section">
              <h2>Our Photography Philosophy</h2>
              
              <div class="space-y-6">
                <div class="form-group">
                  <label>Creative Vision</label>
                  <p class="text-gray-600">Every moment is unique, and every story deserves to be told beautifully. We combine creativity with technical skill to create visually stunning photographs.</p>
                </div>
                
                <div class="form-group">
                  <label>Authentic Connections</label>
                  <p class="text-gray-600">Building genuine relationships with clients allows us to capture authentic emotions and create meaningful photographs that reflect true personalities.</p>
                </div>
                
                <div class="form-group">
                  <label>Quality Commitment</label>
                  <p class="text-gray-600">Committed to delivering exceptional quality and service, ensuring every client receives photographs they'll treasure forever.</p>
                </div>

                <div class="form-group">
                  <label>What Makes Us Special</label>
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">🎨</span>
                      <div>
                        <h4 class="font-semibold text-black">Professional Photography</h4>
                        <p class="text-gray-600 text-sm">High-quality equipment and professional techniques for stunning results.</p>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">✨</span>
                      <div>
                        <h4 class="font-semibold text-black">Creative & Fresh Approach</h4>
                        <p class="text-gray-600 text-sm">Innovative perspectives and modern styling for unique photographs.</p>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">❤️</span>
                      <div>
                        <h4 class="font-semibold text-black">Passionate Service</h4>
                        <p class="text-gray-600 text-sm">Dedicated to capturing your special moments with care and attention.</p>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">⏰</span>
                      <div>
                        <h4 class="font-semibold text-black">Timeless Memories</h4>
                        <p class="text-gray-600 text-sm">Creating photographs that will be cherished for generations.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button class="btn-primary submit-btn contact-btn">Contact Us Today</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    document.querySelectorAll('.contact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'contact' } }));
      });
    });
  }
}