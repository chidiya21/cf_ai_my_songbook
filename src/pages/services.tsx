import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const ServicesPage = () => {
  return Layout({
    title: 'Services',
    currentPath: '/services',
    children: html`
      <style>
        .services-hero {
          padding: ${spacing['4xl']} ${spacing.lg};
          text-align: center;
          max-width: 1280px;
          margin: 0 auto;
        }

        .services-hero h1 {
          font-size: ${typography.fontSize['5xl']};
          margin-bottom: ${spacing.md};
        }

        .services-hero p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          max-width: 700px;
          margin: 0 auto;
        }

        .services-list {
          max-width: 1280px;
          margin: 0 auto;
          padding: ${spacing['3xl']} ${spacing.lg};
        }

        .service-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${spacing['3xl']};
          margin-bottom: ${spacing['4xl']};
          padding: ${spacing['3xl']};
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          align-items: center;
        }

        .service-item:nth-child(even) {
          grid-template-columns: 1fr 1fr;
        }

        .service-item:nth-child(even) .service-content {
          order: 2;
        }

        .service-item:nth-child(even) .service-image {
          order: 1;
        }

        .service-image {
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
        }

        .service-content h2 {
          font-size: ${typography.fontSize['3xl']};
          margin-bottom: ${spacing.md};
        }

        .service-content p {
          font-size: ${typography.fontSize.base};
          color: ${colors.textSecondary};
          margin-bottom: ${spacing.lg};
          line-height: 1.8;
        }

        .service-highlights {
          list-style: none;
          margin-bottom: ${spacing.lg};
        }

        .service-highlights li {
          padding: ${spacing.sm} 0;
          padding-left: ${spacing.lg};
          position: relative;
          color: ${colors.textSecondary};
        }

        .service-highlights li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: ${colors.primary};
          font-weight: ${typography.fontWeight.bold};
        }

        .service-meta {
          display: flex;
          gap: ${spacing.lg};
          margin-bottom: ${spacing.lg};
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: ${spacing.sm};
          color: ${colors.textSecondary};
        }

        .btn-book {
          display: inline-block;
          padding: ${spacing.md} ${spacing.xl};
          background-color: ${colors.primary};
          color: ${colors.text};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          transition: all 0.2s ease;
        }

        .btn-book:hover {
          background-color: ${colors.primaryHover};
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
        }

        .faq-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: ${spacing['4xl']} ${spacing.lg};
          background-color: ${colors.backgroundLight};
        }

        .faq-header {
          text-align: center;
          margin-bottom: ${spacing['3xl']};
        }

        .faq-header h2 {
          font-size: ${typography.fontSize['4xl']};
          margin-bottom: ${spacing.md};
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          padding: ${spacing.lg};
          margin-bottom: ${spacing.md};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item:hover {
          border-color: ${colors.primary};
        }

        .faq-question {
          font-size: ${typography.fontSize.lg};
          font-weight: ${typography.fontWeight.semibold};
          margin-bottom: ${spacing.sm};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .faq-answer {
          color: ${colors.textSecondary};
          line-height: 1.8;
          display: none;
          margin-top: ${spacing.md};
        }

        .faq-item.open .faq-answer {
          display: block;
        }

        @media (max-width: 768px) {
          .service-item {
            grid-template-columns: 1fr !important;
          }

          .service-item:nth-child(even) .service-content {
            order: 1;
          }

          .service-item:nth-child(even) .service-image {
            order: 2;
          }
        }
      </style>

      <section class="services-hero">
        <h1>MY PHOTOGRAPHY SERVICES</h1>
        <p>Professional photography services tailored to capture your unique moments and tell your story.</p>
      </section>

      <section class="services-list">
        <div class="service-item" id="portrait">
          <div class="service-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
          <div class="service-content">
            <h2>Portrait Photography</h2>
            <p>Professional portrait sessions capturing your unique personality and style in the best light.</p>
            <ul class="service-highlights">
              <li>Professional lighting setup</li>
              <li>Multiple outfit changes</li>
              <li>Digital retouching included</li>
              <li>High-resolution digital files</li>
            </ul>
            <div class="service-meta">
              <div class="meta-item">⏱️ 1 hour session</div>
            </div>
            <a href="/schedule" class="btn-book">Book This Session</a>
          </div>
        </div>

        <div class="service-item" id="event">
          <div class="service-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
          <div class="service-content">
            <h2>Event Photography</h2>
            <p>Comprehensive coverage of your special events, from corporate functions to private celebrations.</p>
            <ul class="service-highlights">
              <li>Full event coverage</li>
              <li>Candid and posed shots</li>
              <li>Edited digital gallery</li>
              <li>Online sharing options</li>
            </ul>
            <div class="service-meta">
              <div class="meta-item">⏱️ 4 hours coverage</div>
            </div>
            <a href="/schedule" class="btn-book">Book This Session</a>
          </div>
        </div>

        <div class="service-item" id="wedding">
          <div class="service-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
          <div class="service-content">
            <h2>Wedding Photography</h2>
            <p>Beautiful memories of your wedding day captured with artistic vision and attention to detail.</p>
            <ul class="service-highlights">
              <li>Full day coverage</li>
              <li>Engagement session included</li>
              <li>Premium wedding album</li>
              <li>Second photographer available</li>
            </ul>
            <div class="service-meta">
              <div class="meta-item">⏱️ 8 hours coverage</div>
            </div>
            <a href="/schedule" class="btn-book">Book This Session</a>
          </div>
        </div>

        <div class="service-item" id="commercial">
          <div class="service-image" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></div>
          <div class="service-content">
            <h2>Commercial Photography</h2>
            <p>Professional imagery for your business needs including product photography and brand content.</p>
            <ul class="service-highlights">
              <li>Product photography</li>
              <li>Brand photography</li>
              <li>Commercial usage rights</li>
              <li>Marketing materials</li>
            </ul>
            <div class="service-meta">
              <div class="meta-item">⏱️ 2 hours session</div>
            </div>
            <a href="/schedule" class="btn-book">Book This Session</a>
          </div>
        </div>
      </section>

      <section class="faq-section">
        <div class="faq-header">
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              What type of photography do you specialize in?
              <span>+</span>
            </div>
            <div class="faq-answer">
              I specialize in portrait, event, wedding, and commercial photography. I also offer photojournalism, landscape, theatre, and storytelling photography services.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              What is your pricing structure?
              <span>+</span>
            </div>
            <div class="faq-answer">
              Pricing varies depending on the type of session, duration, and specific requirements. Please contact me for a customized quote based on your needs.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              How can I book a photography session with you?
              <span>+</span>
            </div>
            <div class="faq-answer">
              You can book a session through our scheduling page, where you can check availability and select your preferred date and time. You can also contact me directly through the contact form.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              What equipment do you use for your photography?
              <span>+</span>
            </div>
            <div class="faq-answer">
              I use professional-grade cameras, lenses, and lighting equipment to ensure the highest quality images for all sessions.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              Do you offer prints or digital copies of the photos?
              <span>+</span>
            </div>
            <div class="faq-answer">
              Yes! All packages include high-resolution digital files. Premium prints and albums are available as add-ons.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question">
              How long does it take to receive the edited photos?
              <span>+</span>
            </div>
            <div class="faq-answer">
              Turnaround time is typically 2-3 weeks for standard sessions, and 4-6 weeks for weddings and large events.
            </div>
          </div>
        </div>
      </section>

      <script>
        // FAQ toggle functionality
        document.querySelectorAll('.faq-item').forEach(item => {
          item.addEventListener('click', () => {
            item.classList.toggle('open');
            const icon = item.querySelector('.faq-question span');
            icon.textContent = item.classList.contains('open') ? '−' : '+';
          });
        });
      </script>
    `
  });
};
