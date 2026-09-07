/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#121212',
        chalk: '#E8E8E6',
        surface: '#F3F3F1',
        card: '#F9F9F7',
        muted: '#6E6E6B',
        'border-subtle': 'rgba(18, 18, 18, 0.08)',
        'accent-green': '#25D366',
        'accent-green-dark': '#1B7A42',
      },
      fontFamily: {
        brand: ['Montserrat', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.22em',
      },
      boxShadow: {
        'squircle': '0 14px 34px rgba(18, 18, 18, 0.04)',
        'squircle-hover': '0 20px 45px rgba(18, 18, 18, 0.08)',
        'float': '0 16px 36px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'squircle': '24px',
      }
    },
  },
  plugins: [],
}
