/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#224C3B',
        secondary: '#E8B49E',
        accent: '#C39A4A',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};