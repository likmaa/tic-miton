/* eslint-env node */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#3650D0',
        'brand-orange': '#FF7B00',
        'brand-orange-hover': '#e66f00',
        'brand-orange-light': '#FFCA80',
      },
      spacing: {
        '18': '4.5rem',
      },
      fontFamily: {
        'sans': ['Titillium Web', 'sans-serif'], // Définit la police par défaut
      }
    },
  },
  plugins: [],
}