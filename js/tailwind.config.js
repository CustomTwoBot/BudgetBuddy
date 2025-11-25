/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          900: '#2B0B3A', // deep purple
          700: '#7C3AED', // mid purple
          500: '#B794F4', // light purple
        },
        accent: {
          500: '#FF7A18',
          300: '#FFB86B'
        },
        bg: {
          DEFAULT: '#0B0B0D',
          surface: '#111214'
        }
      },
      borderRadius: {
        'xl-2': '1.25rem',
      },
    }
  },
  plugins: [],
}