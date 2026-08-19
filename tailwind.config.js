/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Electric Violet
          light: '#C4B5FD',
          dark: '#6D28D9',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        secondary: {
          DEFAULT: '#06B6D4', // Vibrant Cyan
          light: '#67E8F9',
          dark: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.4)',
        },
        accent: {
          pink: '#EC4899',
          rose: '#F43F5E',
          amber: '#F59E0B',
          emerald: '#10B981',
        },
        bg: {
          dark: '#090816', // Deep Midnight Obsidian
          darksurface: '#13112A',
          darksurfaceHover: '#1B173B',
          light: '#F8FAFC', // Slate 50
          lightsurface: '#FFFFFF',
          lightsurfaceHover: '#F1F5F9',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 30px -5px rgba(139, 92, 246, 0.4)',
        'glow-secondary': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-accent': '0 0 30px -5px rgba(244, 63, 94, 0.4)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(148, 163, 184, 0.18)',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(ellipse at 50% -20%, #2E1065 0%, #090816 80%)',
        'gradient-hero-light': 'radial-gradient(ellipse at 50% -20%, #F3E8FF 0%, #F8FAFC 80%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
        'gradient-accent': 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

