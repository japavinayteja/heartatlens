export class PrivacyPage {
  render(): string {
    return `
      <section class="legal-section">
        <div class="container">
          <div class="legal-header">
            <h1>Privacy Policy</h1>
            <p class="last-updated">Last updated: January 2025</p>
          </div>

          <div class="legal-content">
            <div class="legal-item">
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul>
                <li>Contact us through our website or email</li>
                <li>Book photography services</li>
                <li>Access password-protected galleries</li>
                <li>Subscribe to our newsletter or updates</li>
              </ul>
              <p>This may include your name, email address, phone number, event details, and any other information you choose to provide.</p>
            </div>

            <div class="legal-item">
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our photography services</li>
                <li>Communicate with you about bookings and services</li>
                <li>Send you photos and access to private galleries</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send promotional materials (with your consent)</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Photo Usage and Rights</h2>
              <p>Regarding the photographs we take:</p>
              <ul>
                <li>You retain ownership rights to your photos</li>
                <li>We may use photos for portfolio and marketing purposes unless you opt out</li>
                <li>We will not sell your photos to third parties</li>
                <li>Social media sharing requires your explicit consent</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div class="legal-item">
              <h2>Gallery Access</h2>
              <p>Private galleries are password-protected and intended only for you and your designated recipients. Please keep your gallery passwords secure and do not share them publicly.</p>
            </div>

            <div class="legal-item">
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request that we not use your photos for marketing</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p><strong>Email:</strong> heartatlens@gmail.com<br>
              <strong>Phone:</strong> +91-7097386546</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEventListeners(): void {
    // No specific event listeners needed for this page
  }
}