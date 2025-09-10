/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"PT Sans"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        primary: '#2c3e50',
        accent: '#3498db'
      }
    }
  },
  plugins: []
};


