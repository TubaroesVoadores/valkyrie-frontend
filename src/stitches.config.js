import { createStitches } from '@stitches/react';

export const {
  styled,
} = createStitches({
  theme: {
    colors: {
      primary900: '#4C1D95',
      primary600: '#7C3AED',
      primary300: '#C4B5FD',
      primary100: '#EDE9FE',
      primary50: '#F5F3FF',
      secondary900: '#2A4E51',
      secondary600: '#1DB5BE',
      secondary300: '#75E3EA',
      secondary100: '#D5FAFC',
      secondary50: '#ECFEFF',
      neutral900: '#111827',
      neutral800: '#1F2937',
      neutral700: '#374151',
      neutral600: '#4B5563',
      neutral500: '#6B7280',
      neutral400: '#9CA3AF',
      neutral300: '#D1D5DB',
      neutral200: '#E5E7EB',
      neutral100: '#F3F4F6',
      neutral50: '#F9FAFB',
    },
    fonts: {
      display: '"Poppins", sans-serif',
      body: '"Inter", sans-serif',
    },
    fontWeights: {
      bold: 700,
      semibold: 600,
      medium: 500,
      regular: 400,
      light: 300,
    },
    fontSizes: {
      display_xxl: '4.5rem',
      display_xl: '3.75rem',
      display_lg: '3rem',
      display_md: '2.25rem',
      display_sm: '1.875rem',
      display_xs: '1.5rem',
      body_xl: '1.25rem',
      body_lg: '1.125rem',
      body_md: '1rem',
      body_sm: '0.875rem',
      body_xs: '0.75rem',
    },
    lineHeights: {
      display_xxl: '5.625rem',
      display_xl: '4.5rem',
      display_lg: '3.75rem',
      display_md: '2.8125rem',
      display_sm: '2.5rem',
      display_xs: '2rem',
      body_xl: '1.75rem',
      body_lg: '1.75rem',
      body_md: '1.5rem',
      body_sm: '1.25rem',
      body_xs: '1rem',
    },
    letterSpacings: {
      display_xxl: '-0.025em',
      display_xl: '-0.025em',
      display_lg: '-0.025em',
      display_md: '-0.025em',
      display_sm: '0',
      display_xs: '0',
      body_xl: '0',
      body_lg: '0',
      body_md: '0',
      body_sm: '0',
      body_xs: '0',
    },
    radii: {
      xxl: '2rem',
      xl: '1rem',
      lg: '0.5rem',
      md: '0.25rem',
      sm: '0.125rem',
    },
  },
  media: {
    bp1: '(max-width: 480px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
    bp4: '(max-width: 1280px)',
  },
});
