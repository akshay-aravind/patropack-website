/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kraft: {
          50: '#faf6ef',
          100: '#f3e9d7',
          200: '#e7d1ad',
          300: '#d9b47e',
          400: '#cd9a5b',
          500: '#c4854a',
          600: '#b06f3e',
          700: '#925836',
          800: '#774830',
          900: '#623c2a',
          950: '#351e15',
        },
        ink: {
          DEFAULT: '#1a1410',
          soft: '#2c2419',
        },
        leaf: {
          400: '#7fae5f',
          500: '#5f9142',
          600: '#4a7433',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
