import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const AboutPage = () => {
  return Layout({
    title: 'About',
    currentPath: '/about',
    children: html`
      <style>
        .about-hero {
          padding: ${spacing['4xl']} ${spacing.lg};
          max-width: 1280px;
          margin: 0 auto;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${spacing['3xl']};
          align-items: center;
        }

        .about-image {
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, ${colors.primary}40 0%, ${colors.accent}40 100%);
          border-radius: 12px;
        }

        .about-text h1 {
          font-size: ${typography.fontSize['5xl']};
          margin-bottom: ${spacing.lg};
        }

        .about-text p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          margin-bottom: ${spacing.md};
          line-height: 1.8;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: ${spacing.lg};
          margin-top: ${spacing['3xl']};
        }

        .stat-card {
          text-align: center;
          padding: ${spacing.xl};
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 12px;
        }

        .stat-number {
          font-size: ${typography.fontSize['4xl']};
          font-weight: ${typography.fontWeight.bold};
          color: ${colors.primary};
          margin-bottom: ${spacing.sm};
        }

        .stat-label {
          color: ${colors.textSecondary};
          font-size: ${typography.fontSize.base};
        }

        .experience-section {
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

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: ${spacing.lg};
        }

        .skill-item {
          padding: ${spacing.lg};
          background-color: ${colors.background};
          border: 1px solid ${colors.border};
          border-radius: 8px;
        }

        .skill-item h3 {
          font-size: ${typography.fontSize.xl};
          margin-bottom: ${spacing.sm};
          color: ${colors.primary};
        }

        .skill-item ul {
          list-style: none;
          margin-top: ${spacing.md};
        }

        .skill-item li {
          color: ${colors.textSecondary};
          margin-bottom: ${spacing.sm};
          padding-left: ${spacing.md};
          position: relative;
        }

        .skill-item li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: ${colors.primary};
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
          }

          .stats {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <section class="about-hero">
        <div class="about-content">
          <div class="about-image"></div>
          <div class="about-text">
            <h1>I AM SHRIYA</h1>
            <p>
              According to a recent census of wisdom, I know a thing should be done, I'd shan to the last
              moment where you end no longer with words of all, down with a words of all's at your point,
              well this story is important to me because it needs context.
            </p>
            <p>
              I'm a professional photographer with a passion for capturing authentic moments and telling
              compelling visual stories. My work spans portrait photography, event coverage, and creative
              storytelling.
            </p>
            <div style="margin-top: ${spacing.xl};">
              <h3 style="margin-bottom: ${spacing.md};">Contact Information</h3>
              <p><strong>Phone Number:</strong> +91-0000000000</p>
              <p><strong>Email:</strong> shriyasateesh@example.com</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Projects Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </section>

      <section class="experience-section">
        <div class="section-container">
          <div class="section-header">
            <h2>Expertise & Services</h2>
          </div>
          <div class="skills-grid">
            <div class="skill-item">
              <h3>Photography Styles</h3>
              <ul>
                <li>Portrait Photography</li>
                <li>Event & Wedding Coverage</li>
                <li>Commercial Photography</li>
                <li>Photojournalism</li>
                <li>Landscape & Nature</li>
                <li>Theatre & Performance</li>
              </ul>
            </div>
            <div class="skill-item">
              <h3>Technical Skills</h3>
              <ul>
                <li>Professional Lighting</li>
                <li>Advanced Composition</li>
                <li>Photo Editing & Retouching</li>
                <li>Studio & Location Shoots</li>
                <li>Digital Asset Management</li>
                <li>Color Grading</li>
              </ul>
            </div>
            <div class="skill-item">
              <h3>Special Services</h3>
              <ul>
                <li>Same-day Editing</li>
                <li>Custom Albums & Prints</li>
                <li>Digital Delivery</li>
                <li>Drone Photography</li>
                <li>Video Production</li>
                <li>Photo Booth Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `
  });
};
