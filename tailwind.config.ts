import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#d97757',
          dark: '#c86647',
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
        'fade-in': 'fadeIn 0.2s ease',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(400px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
