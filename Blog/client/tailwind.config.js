/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'),require('tailwind-scrollbar'),require('@tailwindcss/line-clamp'),],
}