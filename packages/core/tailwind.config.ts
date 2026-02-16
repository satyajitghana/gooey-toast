import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        toast: {
          bg: 'var(--toast-bg)',
          text: 'var(--toast-text)',
          border: 'var(--toast-border)',
        },
      },
      animation: {
        'blob-morph': 'blob-morph 0.3s ease-out',
        'toast-in': 'toast-in 0.2s ease-out',
        'toast-out': 'toast-out 0.15s ease-in',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        'blob-morph': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'toast-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
