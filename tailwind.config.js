/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Noto Sans Arabic"', 'sans-serif'],
      },
      colors: {
        // Professional BI dashboard colors
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          550: '#7c3aed', // primary
          600: '#4f46e5',
          700: '#3730a3',
          800: '#1e1b4b',
        }
      }
    },
  },
  plugins: [],
}
