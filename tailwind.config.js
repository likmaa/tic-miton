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
      },
      fontFamily: {
        'sans': ['Titillium Web', 'sans-serif'], // Définit la police par défaut
        'display': ['Unbounded', 'sans-serif'], // Définit une police pour les titres
      }
    },
  },
  plugins: [],
}