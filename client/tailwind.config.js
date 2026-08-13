/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#131A2E',
          900: '#1B2440',
          800: '#242F52',
          700: '#334073',
        },
        parchment: {
          50: '#FBF9F4',
          100: '#F5F1E7',
          200: '#EBE4D2',
        },
        amber: {
          400: '#F0AD4E',
          500: '#E8973A',
          600: '#CC7A22',
        },
        moss: {
          400: '#4FA890',
          500: '#2F8F76',
          600: '#22735E',
        },
      },
      fontFamily: {
        display: ['"Lexend"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(19,26,46,0.06), 0 8px 24px -8px rgba(19,26,46,0.12)',
      },
      borderRadius: {
        xl2: '1.1rem',
      },
    },
  },
  plugins: [],
};
