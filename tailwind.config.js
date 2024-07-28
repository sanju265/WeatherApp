/** @type {import('tailwindcss').Config} */
export default{
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        navy: {
          600: '#001f3f',
          900: '#001022',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
