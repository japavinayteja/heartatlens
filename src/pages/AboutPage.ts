export class AboutPage {
  render(): string {
    return `
      <div class="pt-16 bg-white min-h-screen">
        <div class="max-w-6xl mx-auto px-6 py-16">
          
          <!-- Page Header -->
          <div class="text-center mb-20">
            <h1 class="text-5xl font-bold text-black mb-6">About HeartAtLens</h1>
          </div>

          <!-- Subtle Divider -->
          <div class="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

          <!-- Our Story and Photography Philosophy Side by Side -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            
            <!-- Our Story Section -->
            <div>
              <h2 class="text-3xl font-bold text-blue-600 mb-8">Our Story</h2>
              <div class="space-y-6">
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  With 2 years of dedicated experience in professional photography, HeartAtLens has developed a unique style that combines artistic vision with technical expertise.
                </p>
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  Specializing in weddings, pre-wedding shoots, and birthday celebrations, we believe in capturing authentic emotions and creating timeless memories.
                </p>
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  Every photograph tells a story, and our mission is to preserve those precious moments that you'll treasure for a lifetime.
                </p>
              </div>
            </div>

            <!-- Our Photography Philosophy Section -->
            <div>
              <h2 class="text-3xl font-bold text-blue-600 mb-8">Our Photography Philosophy</h2>
              <div class="space-y-6">
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  Every moment is unique, and every story deserves to be told beautifully. We combine creativity with technical skill to create visually stunning photographs.
                </p>
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  Building genuine relationships with clients allows us to capture authentic emotions and create meaningful photographs that reflect true personalities.
                </p>
                <p class="text-lg text-gray-600 leading-relaxed text-left">
                  Committed to delivering exceptional quality and service, ensuring every client receives photographs they'll treasure forever.
                </p>
              </div>
            </div>
          </div>

          <!-- Subtle Divider -->
          <div class="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

          <!-- Stats Section - Single Centered Row -->
          <div class="text-center mb-24">
            <h2 class="text-3xl font-bold text-blue-600 mb-12">Our Journey in Numbers</h2>
            <div class="flex justify-center items-center space-x-16">
              
              <div class="text-center">
                <div class="text-6xl mb-4">📅</div>
                <div class="text-4xl font-bold text-black mb-2">2</div>
                <div class="text-lg font-semibold text-gray-600">Years of Experience</div>
              </div>

              <div class="text-center">
                <div class="text-6xl mb-4">😊</div>
                <div class="text-4xl font-bold text-black mb-2">100+</div>
                <div class="text-lg font-semibold text-gray-600">Happy Clients</div>
              </div>

              <div class="text-center">
                <div class="text-6xl mb-4">📸</div>
                <div class="text-4xl font-bold text-black mb-2">500+</div>
                <div class="text-lg font-semibold text-gray-600">Photos Captured</div>
              </div>
            </div>
          </div>

          <!-- Subtle Divider -->
          <div class="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

          <!-- Feature Highlights - Clean Grid Layout -->
          <div class="text-center mb-24">
            <h2 class="text-3xl font-bold text-blue-600 mb-12">What Makes Us Special</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              
              <div class="text-center p-6">
                <div class="text-4xl mb-4">🎨</div>
                <h3 class="text-xl font-bold text-black mb-3">Professional Photography</h3>
                <p class="text-gray-600 leading-relaxed">
                  High-quality equipment and professional techniques for stunning results.
                </p>
              </div>

              <div class="text-center p-6">
                <div class="text-4xl mb-4">✨</div>
                <h3 class="text-xl font-bold text-black mb-3">Creative & Fresh Approach</h3>
                <p class="text-gray-600 leading-relaxed">
                  Innovative perspectives and modern styling for unique photographs.
                </p>
              </div>

              <div class="text-center p-6">
                <div class="text-4xl mb-4">❤️</div>
                <h3 class="text-xl font-bold text-black mb-3">Passionate Service</h3>
                <p class="text-gray-600 leading-relaxed">
                  Dedicated to capturing your special moments with care and attention.
                </p>
              </div>

              <div class="text-center p-6">
                <div class="text-4xl mb-4">⏰</div>
                <h3 class="text-xl font-bold text-black mb-3">Timeless Memories</h3>
                <p class="text-gray-600 leading-relaxed">
                  Creating photographs that will be cherished for generations.
                </p>
              </div>
            </div>
          </div>

          <!-- Subtle Divider -->
          <div class="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

          <!-- Equipment & Expertise Section -->
          <div class="text-center mb-24">
            <h2 class="text-3xl font-bold text-blue-600 mb-8">Equipment & Expertise</h2>
            <p class="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed text-left">
              As a dedicated photographer with 2 years of experience, I use quality photography equipment and stay updated with the latest editing techniques to ensure every photograph meets professional standards.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 class="text-2xl font-bold text-blue-600 mb-6">Camera Systems</h3>
                <div class="space-y-3">
                  <p class="text-lg text-gray-600 text-left">• Professional DSLR Cameras</p>
                  <p class="text-lg text-gray-600 text-left">• Mirrorless Camera Systems</p>
                  <p class="text-lg text-gray-600 text-left">• Backup Equipment Available</p>
                  <p class="text-lg text-gray-600 text-left">• Professional Lighting Setup</p>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-bold text-blue-600 mb-6">Specializations</h3>
                <div class="space-y-3">
                  <p class="text-lg text-gray-600 text-left">• Wedding Photography</p>
                  <p class="text-lg text-gray-600 text-left">• Pre-Wedding Shoots</p>
                  <p class="text-lg text-gray-600 text-left">• Birthday Celebrations</p>
                  <p class="text-lg text-gray-600 text-left">• Baby Shower Events</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Subtle Divider -->
          <div class="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

          <!-- Call to Action -->
          <div class="text-center">
            <h2 class="text-4xl font-bold text-blue-600 mb-6">Ready to Capture Your Story?</h2>
            <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed text-left">
              Let's discuss your photography needs and create beautiful memories together. Contact us today to book your session.
            </p>
            <button class="contact-btn bg-black hover:bg-gray-800 text-white font-semibold py-4 px-12 rounded-lg transition-colors text-lg shadow-lg">
              📞 Contact HeartAtLens
            </button>
          </div>
        </div>
      </div>
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