// Design tokens extracted from Figma
export const colors = {
  primary: '#7C3AED', // Purple accent
  primaryHover: '#6D28D9',
  secondary: '#3B82F6',
  background: '#0A0A0A', // Near black
  backgroundLight: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  accent: '#FF6B35', // Orange accent from Figma
  border: '#2A2A2A',
  error: '#EF4444',
  success: '#10B981'
};

export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px'
};

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

// Global styles
export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.base};
    color: ${colors.text};
    background-color: ${colors.background};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.heading};
    font-weight: ${typography.fontWeight.bold};
    line-height: 1.2;
  }

  h1 { font-size: ${typography.fontSize['6xl']}; }
  h2 { font-size: ${typography.fontSize['5xl']}; }
  h3 { font-size: ${typography.fontSize['4xl']}; }
  h4 { font-size: ${typography.fontSize['3xl']}; }
  h5 { font-size: ${typography.fontSize['2xl']}; }
  h6 { font-size: ${typography.fontSize.xl}; }

  a {
    color: ${colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${colors.primaryHover};
  }

  button {
    font-family: ${typography.fontFamily.primary};
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: ${breakpoints.mobile}) {
    h1 { font-size: ${typography.fontSize['4xl']}; }
    h2 { font-size: ${typography.fontSize['3xl']}; }
    h3 { font-size: ${typography.fontSize['2xl']}; }
  }
`;

// Reusable component styles
export const styles = {
  container: `
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 ${spacing.lg};

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0 ${spacing.md};
    }
  `,

  button: {
    primary: `
      background-color: ${colors.primary};
      color: ${colors.text};
      padding: ${spacing.md} ${spacing.xl};
      border-radius: 8px;
      font-weight: ${typography.fontWeight.semibold};
      font-size: ${typography.fontSize.base};

      &:hover {
        background-color: ${colors.primaryHover};
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    `,

    secondary: `
      background-color: transparent;
      color: ${colors.text};
      padding: ${spacing.md} ${spacing.xl};
      border: 2px solid ${colors.border};
      border-radius: 8px;
      font-weight: ${typography.fontWeight.semibold};
      font-size: ${typography.fontSize.base};

      &:hover {
        border-color: ${colors.primary};
        background-color: rgba(124, 58, 237, 0.1);
      }
    `
  },

  card: `
    background-color: ${colors.backgroundLight};
    border: 1px solid ${colors.border};
    border-radius: 12px;
    padding: ${spacing.xl};
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
    }
  `,

  input: `
    background-color: ${colors.backgroundLight};
    border: 1px solid ${colors.border};
    border-radius: 8px;
    padding: ${spacing.md};
    color: ${colors.text};
    font-size: ${typography.fontSize.base};
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    }

    &::placeholder {
      color: ${colors.textSecondary};
    }
  `,

  grid: {
    portfolio: `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: ${spacing.lg};

      @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: ${spacing.md};
      }
    `,

    masonry: `
      columns: 3;
      column-gap: ${spacing.lg};

      @media (max-width: ${breakpoints.desktop}) {
        columns: 2;
      }

      @media (max-width: ${breakpoints.mobile}) {
        columns: 1;
      }
    `
  }
};
