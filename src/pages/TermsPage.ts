export class TermsPage {
  render(): string {
    return `
      <section class="legal-section">
        <div class="container">
          <div class="legal-header">
            <h1>Terms of Use</h1>
            <p class="last-updated">Last updated: January 2025</p>
          </div>

          <div class="legal-content">
            <div class="legal-item">
              <h2>Acceptance of Terms</h2>
              <p>By accessing and using HeartAtLens photography services and website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>

            <div class="legal-item">
              <h2>Photography Services</h2>
              <h3>Booking and Payment</h3>
              <ul>
                <li>A signed contract and deposit are required to secure your booking</li>
                <li>Full payment is due before or on the day of the event</li>
                <li>Cancellations must be made at least 48 hours in advance</li>
                <li>Deposits are non-refundable unless we cancel the service</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Client Responsibilities</h2>
              <p>Clients agree to:</p>
              <ul>
                <li>Provide accurate event details and timeline</li>
                <li>Ensure photographer safety and access to venues</li>
                <li>Inform us of any special requirements or restrictions</li>
                <li>Treat our equipment and staff with respect</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Photo Delivery and Usage</h2>
              <h3>Delivery Timeline</h3>
              <ul>
                <li>Wedding photos: 4-6 weeks after the event</li>
                <li>Pre-wedding shoots: 2-3 weeks</li>
                <li>Birthday events: 1-2 weeks</li>
                <li>Baby shower events: 2-3 weeks</li>
                <li>Rush delivery available for additional fee</li>
              </ul>
              
              <h3>Usage Rights</h3>
              <ul>
                <li>Clients receive personal usage rights to all delivered photos</li>
                <li>Commercial use requires separate licensing agreement</li>
                <li>HeartAtLens retains copyright and portfolio usage rights</li>
                <li>Photos may be used for marketing unless client opts out</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Gallery Access</h2>
              <ul>
                <li>Private galleries are available for 1 year from delivery date</li>
                <li>Gallery passwords are for client use only</li>
                <li>Unlimited downloads during access period</li>
                <li>Extended access available for additional fee</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Limitation of Liability</h2>
              <p>HeartAtLens' liability is limited to the amount paid for services. We are not responsible for:</p>
              <ul>
                <li>Equipment failure beyond our control</li>
                <li>Venue restrictions that limit photography</li>
                <li>Weather conditions affecting outdoor shoots</li>
                <li>Third-party actions that disrupt the event</li>
              </ul>
            </div>

            <div class="legal-item">
              <h2>Force Majeure</h2>
              <p>We are not liable for failure to perform due to circumstances beyond our control, including but not limited to natural disasters, government restrictions, or health emergencies.</p>
            </div>

            <div class="legal-item">
              <h2>Dispute Resolution</h2>
              <p>Any disputes will be resolved through good faith negotiation. If necessary, disputes will be handled under the jurisdiction of Hyderabad, Telangana, India.</p>
            </div>

            <div class="legal-item">
              <h2>Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
            </div>

            <div class="legal-item">
              <h2>Contact Information</h2>
              <p>For questions about these terms, contact us at:</p>
              <p><strong>Email:</strong> heartatlens@gmail.com<br>
              <strong>Phone:</strong> +91-7097386546<br>
              <strong>Address:</strong> Kandlakoya Village, Medchal, Hyderabad, Telangana 501401, India</p>
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