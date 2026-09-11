/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void:    '#0F172A',
        surface: '#18181B',
        border:  '#27272A',
        primary: '#06B6D4',
        accent:  '#3B82F6',
        text:    '#FAFAFA',
        muted:   '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%':   { boxShadow: '0 0 20px #06B6D44D' },
          '100%': { boxShadow: '0 0 40px #06B6D499' },
        },
      },
    },
  },
  plugins: [],
};
