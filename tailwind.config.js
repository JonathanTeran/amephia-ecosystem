/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        borderC: '#333333',
        primary: '#3b82f6',
        accentGym: '#cc5500', // Burnt Orange
        accentNutri: '#8fa876', // Sage Green
        mutedText: '#a3a3a3',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
