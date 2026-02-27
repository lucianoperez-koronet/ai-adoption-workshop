/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#109347',
        'primary-hover': '#0d7a39',
      },
    },
  },
  plugins: [],
};
