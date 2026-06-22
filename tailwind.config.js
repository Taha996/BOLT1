/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cms-green': '#1a5f3c',
        'cms-green-dark': '#124d2e',
        'cms-green-light': '#2d7a52',
        'cms-gold': '#b8860b',
        'cms-gold-light': '#d4a017',
        'cms-cream': '#f5f0e8',
        'cms-stone': '#8c7e6a',
        'cms-charcoal': '#2c2c2c',
        'cms-warm': '#faf8f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
