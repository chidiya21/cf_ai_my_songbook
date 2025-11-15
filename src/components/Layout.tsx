import { html } from 'hono/html';
import { colors, typography, spacing, globalStyles } from '../utils/styles';

interface LayoutProps {
  title: string;
  children: any;
  currentPath?: string;
}

export const Layout = ({ title, children, currentPath = '/' }: LayoutProps) => {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Shriya Sateesh Photography</title>
  <style>
    ${globalStyles}

    .nav {
      position: sticky;
      top: 0;
      background-color: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid ${colors.border};
      z-index: 100;
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: ${spacing.lg};
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: ${typography.fontSize['2xl']};
      font-weight: ${typography.fontWeight.bold};
      color: ${colors.text};
    }

    .logo span {
      color: ${colors.primary};
    }

    .nav-links {
      display: flex;
      gap: ${spacing.xl};
      list-style: none;
    }

    .nav-links a {
      color: ${colors.textSecondary};
      font-weight: ${typography.fontWeight.medium};
      transition: color 0.2s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: ${colors.primary};
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      color: ${colors.text};
      font-size: ${typography.fontSize['2xl']};
      padding: ${spacing.sm};
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }

      .nav-links {
        display: none;
      }

      .nav-links.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: ${colors.background};
        padding: ${spacing.lg};
        border-bottom: 1px solid ${colors.border};
      }
    }

    .footer {
      background-color: ${colors.backgroundLight};
      border-top: 1px solid ${colors.border};
      margin-top: ${spacing['4xl']};
      padding: ${spacing['3xl']} ${spacing.lg};
    }

    .footer-container {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: ${spacing.xl};
    }

    .footer-section h3 {
      font-size: ${typography.fontSize.xl};
      margin-bottom: ${spacing.md};
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section li {
      margin-bottom: ${spacing.sm};
    }

    .footer-section a {
      color: ${colors.textSecondary};
    }

    .footer-section a:hover {
      color: ${colors.primary};
    }

    .social-links {
      display: flex;
      gap: ${spacing.md};
      margin-top: ${spacing.md};
    }

    .social-links a {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.background};
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .social-links a:hover {
      background-color: ${colors.primary};
      transform: translateY(-2px);
    }

    .copyright {
      text-align: center;
      margin-top: ${spacing.xl};
      padding-top: ${spacing.xl};
      border-top: 1px solid ${colors.border};
      color: ${colors.textSecondary};
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-container">
      <div class="logo">
        SHRIYA <span>SATEESH</span>
      </div>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
      <ul class="nav-links" id="navLinks">
        <li><a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a></li>
        <li><a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About</a></li>
        <li><a href="/portfolio" class="${currentPath === '/portfolio' ? 'active' : ''}">Portfolio</a></li>
        <li><a href="/services" class="${currentPath === '/services' ? 'active' : ''}">Services</a></li>
        <li><a href="/schedule" class="${currentPath === '/schedule' ? 'active' : ''}">Schedule</a></li>
        <li><a href="/contact" class="${currentPath === '/contact' ? 'active' : ''}">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main>
    ${children}
  </main>

  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Shriya Sateesh</h3>
        <p style="color: ${colors.textSecondary}; margin-top: ${spacing.md};">
          Professional photographer specializing in portraits, events, and storytelling.
        </p>
        <div class="social-links">
          <a href="https://instagram.com" target="_blank">📷</a>
          <a href="https://twitter.com" target="_blank">🐦</a>
          <a href="mailto:shriyasateesh@example.com">✉️</a>
        </div>
      </div>

      <div class="footer-section">
        <h3>Services</h3>
        <ul>
          <li><a href="/services#portrait">Portrait Photography</a></li>
          <li><a href="/services#event">Event Photography</a></li>
          <li><a href="/services#wedding">Wedding Photography</a></li>
          <li><a href="/services#commercial">Commercial Photography</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/portfolio">View Portfolio</a></li>
          <li><a href="/schedule">Book a Session</a></li>
          <li><a href="/about">About Me</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contact</h3>
        <ul>
          <li style="color: ${colors.textSecondary};">shriyasateesh@example.com</li>
          <li style="color: ${colors.textSecondary};">+1 (555) 123-4567</li>
        </ul>
      </div>
    </div>

    <div class="copyright">
      <p>&copy; ${new Date().getFullYear()} Shriya Sateesh Photography. All rights reserved.</p>
    </div>
  </footer>

  <script>
    function toggleMobileMenu() {
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.toggle('mobile-open');
    }
  </script>
</body>
</html>`;
};
