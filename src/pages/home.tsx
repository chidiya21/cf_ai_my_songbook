import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const HomePage = () => {
  return Layout({
    title: 'Home',
    currentPath: '/',
    children: html`
      <style>
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: ${spacing['4xl']} ${spacing.lg};
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, ${colors.primary}40 0%, transparent 70%);
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: ${typography.fontSize['6xl']};
          margin-bottom: ${spacing.lg};
          background: linear-gradient(135deg, ${colors.text} 0%, ${colors.primary} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: ${typography.fontSize.xl};
          color: ${colors.textSecondary};
          margin-bottom: ${spacing['2xl']};
        }

        .hero-buttons {
          display: flex;
          gap: ${spacing.md};
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: ${spacing.md} ${spacing.xl};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          font-size: ${typography.fontSize.base};
          transition: all 0.2s ease;
          display: inline-block;
        }

        .btn-primary {
          background-color: ${colors.primary};
          color: ${colors.text};
        }

        .btn-primary:hover {
          background-color: ${colors.primaryHover};
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
        }

        .btn-secondary {
          background-color: transparent;
          color: ${colors.text};
          border: 2px solid ${colors.border};
        }

        .btn-secondary:hover {
          border-color: ${colors.primary};
          background-color: rgba(124, 58, 237, 0.1);
        }

        .featured-work {
          padding: ${spacing['4xl']} ${spacing.lg};
          background-color: ${colors.backgroundLight};
        }

        .section-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: ${spacing['3xl']};
        }

        .section-header h2 {
          font-size: ${typography.fontSize['4xl']};
          margin-bottom: ${spacing.md};
        }

        .section-header p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: ${spacing.lg};
        }

        .portfolio-item {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, ${colors.backgroundLight} 0%, ${colors.background} 100%);
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .portfolio-item:hover {
          transform: scale(1.05);
        }

        .portfolio-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .portfolio-item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: ${spacing.lg};
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .portfolio-item:hover .portfolio-item-overlay {
          transform: translateY(0);
        }

        .services-section {
          padding: ${spacing['4xl']} ${spacing.lg};
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${spacing.lg};
        }

        .service-card {
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          padding: ${spacing.xl};
          transition: all 0.3s ease;
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-8px);
          border-color: ${colors.primary};
          box-shadow: 0 12px 24px rgba(124, 58, 237, 0.2);
        }

        .service-icon {
          font-size: ${typography.fontSize['4xl']};
          margin-bottom: ${spacing.md};
        }

        .service-card h3 {
          font-size: ${typography.fontSize.xl};
          margin-bottom: ${spacing.sm};
        }

        .service-card p {
          color: ${colors.textSecondary};
          margin-bottom: ${spacing.md};
        }

        .cta-section {
          padding: ${spacing['4xl']} ${spacing.lg};
          background: linear-gradient(135deg, ${colors.primary}20 0%, ${colors.background} 100%);
          text-align: center;
        }

        .cta-section h2 {
          font-size: ${typography.fontSize['4xl']};
          margin-bottom: ${spacing.lg};
        }

        .cta-section p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          margin-bottom: ${spacing.xl};
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: ${typography.fontSize['4xl']};
          }

          .hero p {
            font-size: ${typography.fontSize.base};
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <section class="hero">
        <div class="hero-content">
          <h1>LET'S WORK TOGETHER</h1>
          <p>Capturing moments, telling stories, and creating timeless memories through photography</p>
          <div class="hero-buttons">
            <a href="/schedule" class="btn btn-primary">Schedule a Session</a>
            <a href="/portfolio" class="btn btn-secondary">View Portfolio</a>
          </div>
        </div>
      </section>

      <section class="featured-work">
        <div class="section-container">
          <div class="section-header">
            <h2>Featured Work</h2>
            <p>A selection of my recent photography projects</p>
          </div>
          <div class="portfolio-grid">
            <div class="portfolio-item">
              <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
              <div class="portfolio-item-overlay">
                <h3>Portrait Session</h3>
                <p style="color: ${colors.textSecondary};">Professional portraits</p>
              </div>
            </div>
            <div class="portfolio-item">
              <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
              <div class="portfolio-item-overlay">
                <h3>Wedding Photography</h3>
                <p style="color: ${colors.textSecondary};">Capturing love stories</p>
              </div>
            </div>
            <div class="portfolio-item">
              <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
              <div class="portfolio-item-overlay">
                <h3>Event Coverage</h3>
                <p style="color: ${colors.textSecondary};">Special moments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="services-section">
        <div class="section-container">
          <div class="section-header">
            <h2>My Photography Services</h2>
            <p>Professional photography tailored to your needs</p>
          </div>
          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">📸</div>
              <h3>Portrait Photography</h3>
              <p>Professional portraits that capture your personality</p>
              <a href="/services#portrait" style="color: ${colors.primary};">Learn More →</a>
            </div>
            <div class="service-card">
              <div class="service-icon">🎉</div>
              <h3>Event Photography</h3>
              <p>Comprehensive coverage of your special events</p>
              <a href="/services#event" style="color: ${colors.primary};">Learn More →</a>
            </div>
            <div class="service-card">
              <div class="service-icon">💍</div>
              <h3>Wedding Photography</h3>
              <p>Beautiful memories of your wedding day</p>
              <a href="/services#wedding" style="color: ${colors.primary};">Learn More →</a>
            </div>
            <div class="service-card">
              <div class="service-icon">🏢</div>
              <h3>Commercial</h3>
              <p>Professional imagery for your business needs</p>
              <a href="/services#commercial" style="color: ${colors.primary};">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="section-container">
          <h2>Ready to Work Together?</h2>
          <p>Let's create something amazing. Schedule a session or reach out to discuss your photography needs.</p>
          <div class="hero-buttons">
            <a href="/schedule" class="btn btn-primary">Book Now</a>
            <a href="/contact" class="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>
    `
  });
};
