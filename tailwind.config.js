/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060E1A',
          900: '#0A1628',
          800: '#0F1F38',
          700: '#132042',
          600: '#1A2D55',
          500: '#243B6A',
          400: '#3A5590',
          300: '#5A7AB5',
          200: '#8AA4D0',
          100: '#C0D0E8',
          50:  '#E8EDF5',
        },
        gold: {
          900: '#6B5520',
          800: '#8A6E2B',
          700: '#A88838',
          600: '#B89A4A',
          500: '#C9A96E',
          400: '#D4BB88',
          300: '#DFCDA2',
          200: '#EADFC0',
          100: '#F2ECDB',
          50:  '#FAF7F0',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F0EA',
          300: '#EDE6DB',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-up-slow': 'fadeInUp 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'count-up': 'countUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 110, 0.3)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(201, 169, 110, 0.15)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'gold': '0 4px 24px -4px rgba(201, 169, 110, 0.25)',
        'gold-lg': '0 8px 40px -8px rgba(201, 169, 110, 0.35)',
        'navy': '0 4px 24px -4px rgba(10, 22, 40, 0.3)',
        'navy-lg': '0 12px 48px -12px rgba(10, 22, 40, 0.4)',
        'card': '0 1px 3px rgba(10, 22, 40, 0.06), 0 8px 24px -8px rgba(10, 22, 40, 0.1)',
        'card-hover': '0 4px 12px rgba(10, 22, 40, 0.08), 0 16px 48px -12px rgba(10, 22, 40, 0.18)',
      },
    },
  },
  plugins: [],
}
