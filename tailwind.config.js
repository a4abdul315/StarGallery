/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#00A651',
        'primary-dark': '#008A44',
        'primary-light': '#E8F8F0',
        danger: '#E30613',
        'brand-red': '#C8181A',
        'top-bar': '#1A1A1A',
        muted: '#888888',
        'star-yellow': '#FFA500',
        'card-border': '#E5E7EB',
        'tabby-orange': '#FF6B00',
        'tamara-purple': '#6B2D8B',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        header: '0 2px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
