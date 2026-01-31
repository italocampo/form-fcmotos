/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fc-orange': '#ea580c',
        'fc-orange-hover': '#c2410c',
        'fc-dark': '#0f0f10',
        'fc-gray': '#1e1e20',
        'fc-input': '#27272a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}