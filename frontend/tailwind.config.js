/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // if using app dir
  ],
  theme: {
    extend: {
      colors: {
        basketOrange: '#FF4500',   // Primary accent
        darkCourt: '#0F172A',      // Dark background
        lightCourt: '#E2E8F0',     // Light gray background
        netWhite: '#F8FAFC'        // Light for contrast
      },
      fontFamily: {
        sporty: ['"Bebas Neue"', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        'screen-10': '10vh'
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        }
      },
      animation: {
        flicker: 'flicker 2s infinite ease-in-out'
      }
    },
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
}
