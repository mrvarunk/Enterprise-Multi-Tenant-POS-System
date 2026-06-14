/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F8F6',        // page background (warm off-white)
          surface: '#FFFFFF',   // card surface
          border: '#E6E6E6',    // subtle borders
          accent: '#EA580C',    // burnt orange primary
          text: '#0F1724',      // near-black text
          muted: '#6B7280',     // muted text
        },
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        md: '6px',
        lg: '10px',
      },
      boxShadow: {
        soft: '0 6px 24px rgba(15, 23, 36, 0.08)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.02)'
      },
      transitionDuration: {
        150: '150ms',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
      },
    },
  },
  plugins: [],
}

