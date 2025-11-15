import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const ContactPage = () => {
  return Layout({
    title: 'Contact',
    currentPath: '/contact',
    children: html`
      <style>
        .contact-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: ${spacing['4xl']} ${spacing.lg};
        }

        .contact-header {
          text-align: center;
          margin-bottom: ${spacing['3xl']};
        }

        .contact-header h1 {
          font-size: ${typography.fontSize['5xl']};
          margin-bottom: ${spacing.md};
        }

        .contact-header p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${spacing['3xl']};
        }

        .contact-info {
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing['2xl']};
        }

        .contact-info h2 {
          font-size: ${typography.fontSize['2xl']};
          margin-bottom: ${spacing.lg};
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: ${spacing.md};
          margin-bottom: ${spacing.lg};
          padding: ${spacing.md};
          background-color: ${colors.background};
          border-radius: 8px;
        }

        .info-icon {
          font-size: ${typography.fontSize['2xl']};
          min-width: 40px;
        }

        .info-content h3 {
          font-size: ${typography.fontSize.lg};
          margin-bottom: ${spacing.sm};
        }

        .info-content p {
          color: ${colors.textSecondary};
          line-height: 1.6;
        }

        .info-content a {
          color: ${colors.primary};
        }

        .info-content a:hover {
          color: ${colors.primaryHover};
        }

        .social-section {
          margin-top: ${spacing['2xl']};
          padding-top: ${spacing['2xl']};
          border-top: 1px solid ${colors.border};
        }

        .social-section h3 {
          font-size: ${typography.fontSize.lg};
          margin-bottom: ${spacing.md};
        }

        .social-links {
          display: flex;
          gap: ${spacing.md};
        }

        .social-link {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 50%;
          font-size: ${typography.fontSize.xl};
          transition: all 0.2s ease;
        }

        .social-link:hover {
          background-color: ${colors.primary};
          border-color: ${colors.primary};
          transform: translateY(-4px);
        }

        .contact-form {
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing['2xl']};
        }

        .contact-form h2 {
          font-size: ${typography.fontSize['2xl']};
          margin-bottom: ${spacing.lg};
        }

        .form-group {
          margin-bottom: ${spacing.lg};
        }

        .form-group label {
          display: block;
          margin-bottom: ${spacing.sm};
          font-weight: ${typography.fontWeight.medium};
          color: ${colors.textSecondary};
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: ${spacing.md};
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-size: ${typography.fontSize.base};
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: ${colors.primary};
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .submit-btn {
          width: 100%;
          padding: ${spacing.md};
          background-color: ${colors.primary};
          color: ${colors.text};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          font-size: ${typography.fontSize.base};
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          background-color: ${colors.primaryHover};
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .success-message {
          background-color: ${colors.success}20;
          border: 1px solid ${colors.success};
          color: ${colors.success};
          padding: ${spacing.md};
          border-radius: 8px;
          margin-bottom: ${spacing.lg};
          display: none;
        }

        .success-message.show {
          display: block;
        }

        .map-section {
          margin-top: ${spacing['3xl']};
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing['2xl']};
          text-align: center;
        }

        .map-section h2 {
          font-size: ${typography.fontSize['2xl']};
          margin-bottom: ${spacing.md};
        }

        .map-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.textSecondary};
          font-size: ${typography.fontSize.lg};
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="contact-container">
        <div class="contact-header">
          <h1>Get in Touch</h1>
          <p>Have a question or want to work together? I'd love to hear from you!</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <h2>Contact Information</h2>

            <div class="info-item">
              <div class="info-icon">📧</div>
              <div class="info-content">
                <h3>Email</h3>
                <p><a href="mailto:shriyasateesh@example.com">shriyasateesh@example.com</a></p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">📱</div>
              <div class="info-content">
                <h3>Phone</h3>
                <p><a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">⏰</div>
              <div class="info-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br>
                Saturday: 10:00 AM - 4:00 PM<br>
                Sunday: By Appointment</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">📍</div>
              <div class="info-content">
                <h3>Location</h3>
                <p>Serving clients nationwide<br>
                Studio sessions available by appointment</p>
              </div>
            </div>

            <div class="social-section">
              <h3>Follow Me</h3>
              <div class="social-links">
                <a href="https://instagram.com" target="_blank" class="social-link">📷</a>
                <a href="https://twitter.com" target="_blank" class="social-link">🐦</a>
                <a href="https://facebook.com" target="_blank" class="social-link">👤</a>
                <a href="https://linkedin.com" target="_blank" class="social-link">💼</a>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h2>Send a Message</h2>

            <div class="success-message" id="successMessage">
              Thank you for your message! I'll get back to you as soon as possible.
            </div>

            <form id="contactForm">
              <div class="form-group">
                <label for="name">Your Name *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div class="form-group">
                <label for="email">Your Email *</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <input type="text" id="subject" name="subject" required />
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" required placeholder="Tell me about your photography needs..."></textarea>
              </div>

              <button type="submit" class="submit-btn" id="submitBtn">Send Message</button>
            </form>
          </div>
        </div>

        <div class="map-section">
          <h2>Service Area</h2>
          <div class="map-placeholder">
            📍 Serving clients nationwide with studio locations available
          </div>
        </div>
      </div>

      <script>
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
          e.preventDefault();

          const submitBtn = document.getElementById('submitBtn');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';

          const formData = new FormData(e.target);
          const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
          };

          // Simulate sending (in production, this would call an API)
          setTimeout(() => {
            document.getElementById('successMessage').classList.add('show');
            e.target.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            setTimeout(() => {
              document.getElementById('successMessage').classList.remove('show');
            }, 5000);
          }, 1000);

          // In production, you would send the message like this:
          /*
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(message)
            });

            const data = await response.json();

            if (data.success) {
              document.getElementById('successMessage').classList.add('show');
              e.target.reset();
              setTimeout(() => {
                document.getElementById('successMessage').classList.remove('show');
              }, 5000);
            } else {
              alert('Error: ' + (data.error || 'Failed to send message'));
            }
          } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
          */
        });
      </script>
    `
  });
};
