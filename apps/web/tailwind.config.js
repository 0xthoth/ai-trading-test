/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#10131a',
        'surface-container': '#1d2026',
        'surface-container-lowest': '#0b0e14',
        'surface-container-highest': '#32353c',
        'on-surface': '#e1e2eb',
        'on-surface-variant': '#cbc3d9',
        primary: '#cfbdff',
        'primary-container': '#6200ee',
        'on-primary': '#3a0093',
        'on-primary-fixed': '#22005d',
        secondary: '#bac8dc',
        tertiary: '#00daf3',
        outline: '#948da2',
        'outline-variant': '#494456',
        error: '#ffb4ab',
        'error-container': '#93000a',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
    },
  },
  plugins: [],
};
