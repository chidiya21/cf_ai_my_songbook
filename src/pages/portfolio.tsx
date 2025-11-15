import { Layout } from '../components/Layout';
import { html } from 'hono/html';
import { colors, spacing, typography } from '../utils/styles';

export const PortfolioPage = () => {
  return Layout({
    title: 'Portfolio',
    currentPath: '/portfolio',
    children: html`
      <style>
        .portfolio-hero {
          padding: ${spacing['4xl']} ${spacing.lg};
          text-align: center;
        }

        .portfolio-hero h1 {
          font-size: ${typography.fontSize['5xl']};
          margin-bottom: ${spacing.md};
        }

        .portfolio-hero p {
          font-size: ${typography.fontSize.lg};
          color: ${colors.textSecondary};
          max-width: 600px;
          margin: 0 auto ${spacing.xl};
        }

        .category-filters {
          display: flex;
          gap: ${spacing.md};
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: ${spacing['3xl']};
        }

        .filter-btn {
          padding: ${spacing.sm} ${spacing.lg};
          background-color: ${colors.backgroundLight};
          border: 1px solid ${colors.border};
          border-radius: 8px;
          color: ${colors.text};
          font-weight: ${typography.fontWeight.medium};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background-color: ${colors.primary};
          border-color: ${colors.primary};
        }

        .gallery-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 ${spacing.lg};
        }

        .masonry-grid {
          column-count: 3;
          column-gap: ${spacing.lg};
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: ${spacing.lg};
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .masonry-item:hover {
          transform: scale(1.02);
        }

        .masonry-item img {
          width: 100%;
          display: block;
          border-radius: 12px;
        }

        .item-placeholder {
          width: 100%;
          background: linear-gradient(135deg, ${colors.backgroundLight} 0%, ${colors.background} 100%);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .item-placeholder::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          to {
            left: 100%;
          }
        }

        .item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: ${spacing.lg};
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .masonry-item:hover .item-overlay {
          transform: translateY(0);
        }

        .item-overlay h3 {
          font-size: ${typography.fontSize.xl};
          margin-bottom: ${spacing.sm};
        }

        .item-overlay p {
          color: ${colors.textSecondary};
          font-size: ${typography.fontSize.sm};
        }

        .load-more {
          text-align: center;
          padding: ${spacing['3xl']} 0;
        }

        .load-more-btn {
          padding: ${spacing.md} ${spacing['2xl']};
          background-color: ${colors.primary};
          color: ${colors.text};
          border-radius: 8px;
          font-weight: ${typography.fontWeight.semibold};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .load-more-btn:hover {
          background-color: ${colors.primaryHover};
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 640px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      </style>

      <section class="portfolio-hero">
        <h1>EXPLORE MY PHOTOGRAPHY WORK.</h1>
        <p>A collection of my favorite captures across different photography styles and projects.</p>

        <div class="category-filters">
          <button class="filter-btn active" data-category="all">All</button>
          <button class="filter-btn" data-category="portrait">Portraits</button>
          <button class="filter-btn" data-category="event">Events</button>
          <button class="filter-btn" data-category="wedding">Weddings</button>
          <button class="filter-btn" data-category="commercial">Commercial</button>
          <button class="filter-btn" data-category="landscape">Landscape</button>
          <button class="filter-btn" data-category="theatre">Theatre</button>
        </div>
      </section>

      <section class="gallery-container">
        <div class="masonry-grid" id="galleryGrid">
          <!-- Portrait -->
          <div class="masonry-item" data-category="portrait">
            <div class="item-placeholder" style="aspect-ratio: 3/4; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div class="item-overlay">
              <h3>Portrait Session</h3>
              <p>Professional portrait photography</p>
            </div>
          </div>

          <!-- Event -->
          <div class="masonry-item" data-category="event">
            <div class="item-placeholder" style="aspect-ratio: 4/3; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
            <div class="item-overlay">
              <h3>Corporate Event</h3>
              <p>Event coverage and candid moments</p>
            </div>
          </div>

          <!-- Wedding -->
          <div class="masonry-item" data-category="wedding">
            <div class="item-placeholder" style="aspect-ratio: 2/3; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
            <div class="item-overlay">
              <h3>Wedding Day</h3>
              <p>Capturing love stories</p>
            </div>
          </div>

          <!-- Commercial -->
          <div class="masonry-item" data-category="commercial">
            <div class="item-placeholder" style="aspect-ratio: 16/9; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></div>
            <div class="item-overlay">
              <h3>Product Shoot</h3>
              <p>Commercial photography</p>
            </div>
          </div>

          <!-- Landscape -->
          <div class="masonry-item" data-category="landscape">
            <div class="item-placeholder" style="aspect-ratio: 3/2; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);"></div>
            <div class="item-overlay">
              <h3>Nature Landscape</h3>
              <p>Scenic photography</p>
            </div>
          </div>

          <!-- More items -->
          <div class="masonry-item" data-category="portrait">
            <div class="item-placeholder" style="aspect-ratio: 4/5; background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);"></div>
            <div class="item-overlay">
              <h3>Studio Portrait</h3>
              <p>Creative lighting setup</p>
            </div>
          </div>

          <div class="masonry-item" data-category="theatre">
            <div class="item-placeholder" style="aspect-ratio: 3/4; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);"></div>
            <div class="item-overlay">
              <h3>Theatre Performance</h3>
              <p>Stage photography</p>
            </div>
          </div>

          <div class="masonry-item" data-category="event">
            <div class="item-placeholder" style="aspect-ratio: 16/10; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);"></div>
            <div class="item-overlay">
              <h3>Conference</h3>
              <p>Professional event coverage</p>
            </div>
          </div>
        </div>

        <div class="load-more">
          <button class="load-more-btn" id="loadMoreBtn">Load More Photos</button>
        </div>
      </section>

      <script>
        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.masonry-item');

        filterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
              if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          });
        });

        // Load more functionality
        document.getElementById('loadMoreBtn')?.addEventListener('click', async () => {
          try {
            const response = await fetch('/api/photos');
            const data = await response.json();
            // Handle loading more photos
            console.log('Load more photos:', data);
          } catch (error) {
            console.error('Error loading photos:', error);
          }
        });
      </script>
    `
  });
};
