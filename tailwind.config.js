import preline from 'preline/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./node_modules/preline/preline.js'],
  plugins: [preline],
  theme: {
    extend: {},
  },
}

