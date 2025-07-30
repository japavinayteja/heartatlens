export class FAQPage {
  render(): string {
    return `
      <section class="faq-section">
        <div class="container">
          <div class="section-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our photography services</p>
          </div>

          <div class="faq-content">
            <div class="faq-category">
              <h2>Booking & Pricing</h2>
              
              <div class="faq-item">
                <div class="faq-question">
                  <h3>How far in advance should I book?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>We recommend booking 3-6 months in advance for weddings, especially during peak season (October-March). For pre-wedding shoots and birthday events, 2-4 weeks advance booking is usually sufficient.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>What are your photography packages and pricing?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Our packages vary based on event type, duration, and requirements. Wedding packages start from ₹25,000, pre-wedding shoots from ₹8,000, and birthday coverage from ₹5,000. Contact us for detailed pricing and customized packages.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Do you require a deposit?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Yes, we require a 30% deposit to secure your booking date. The remaining balance is due before or on the day of the event. We accept bank transfers, UPI, and cash payments.</p>
                </div>
              </div>
            </div>

            <div class="faq-category">
              <h2>Photography Services</h2>
              
              <div class="faq-item">
                <div class="faq-question">
                  <h3>What types of events do you cover?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>We specialize in weddings, pre-wedding shoots, and birthday celebrations. We also cover engagement ceremonies, anniversary celebrations, and family portraits.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Do you travel for destination events?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Yes, we love destination photography! Travel charges apply for locations outside Hyderabad. We cover events across Telangana, Andhra Pradesh, and other states upon request.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>How many photos will I receive?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>For weddings, you'll receive 300-500+ edited photos depending on the package. Pre-wedding shoots include 50-100 edited photos, and birthday events include 100-200 photos. All photos are professionally edited and high-resolution.</p>
                </div>
              </div>
            </div>

            <div class="faq-category">
              <h2>Photo Delivery & Access</h2>
              
              <div class="faq-item">
                <div class="faq-question">
                  <h3>How long does it take to receive photos?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Wedding photos are delivered within 4-6 weeks, pre-wedding shoots within 2-3 weeks, birthday events within 1-2 weeks, and baby showers within 2-3 weeks. We provide a few preview photos within 48 hours for weddings.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>How will I receive my photos?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Photos are delivered through a private, password-protected online gallery where you can view, download, and share your images. You'll also receive a USB drive with all high-resolution photos for larger packages.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>How long will my gallery be available?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Your private gallery remains active for 1 year from the delivery date. You can download photos unlimited times during this period. Extended access is available for an additional fee.</p>
                </div>
              </div>
            </div>

            <div class="faq-category">
              <h2>Technical & Equipment</h2>
              
              <div class="faq-item">
                <div class="faq-question">
                  <h3>What equipment do you use?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>We use professional DSLR cameras, multiple lenses for different shots, external lighting equipment, and backup gear to ensure no moment is missed. All equipment is regularly maintained and updated.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Do you have backup equipment?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Absolutely! We always carry backup cameras, lenses, batteries, and memory cards to every event. We also have backup lighting equipment to handle any technical issues.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Can you work in low light conditions?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Yes, our professional equipment and expertise allow us to capture beautiful photos in various lighting conditions, including indoor ceremonies, evening events, and night celebrations.</p>
                </div>
              </div>
            </div>

            <div class="faq-category">
              <h2>Policies & Miscellaneous</h2>
              
              <div class="faq-item">
                <div class="faq-question">
                  <h3>What is your cancellation policy?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Cancellations must be made at least 48 hours in advance. The deposit is non-refundable, but can be transferred to a future date within 6 months, subject to availability.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Can I request specific shots or styles?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Absolutely! We encourage clients to share their vision, preferred styles, and must-have shots. We'll discuss your requirements during the consultation and ensure we capture your special moments as envisioned.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question">
                  <h3>Do you provide printed photos or albums?</h3>
                  <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                  <p>Yes, we offer premium photo albums, canvas prints, and framed photographs as add-on services. These are professionally printed using high-quality materials and can be customized to your preferences.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="faq-contact">
            <h2>Still have questions?</h2>
            <p>Can't find the answer you're looking for? We're here to help!</p>
            <button class="btn-primary contact-btn">Contact Us</button>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem?.querySelector('.faq-answer');
        const toggle = question.querySelector('.faq-toggle');
        
        if (faqItem && answer && toggle) {
          const isOpen = faqItem.classList.contains('active');
          
          // Close all other FAQ items
          document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const itemToggle = item.querySelector('.faq-toggle');
            if (itemToggle) itemToggle.textContent = '+';
          });
          
          // Toggle current item
          if (!isOpen) {
            faqItem.classList.add('active');
            toggle.textContent = '−';
          }
        }
      });
    });

    // Contact button
    document.querySelectorAll('.contact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'contact' } }));
      });
    });
  }
}