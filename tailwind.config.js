/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: '#fffffe',
        backgroundColorLight: '#d1d1e9',
        strokeColor: '#2b2c34',
        primaryColor: '#6246ea',
        secondaryColor: '#d1d1e9',
        titleColor: '#2b2c34',
        textColor: '#2b2c34',
        errorColor: '#e45858',
      },
      fontSize: {
        h1: ['33.18px', { lineHeight: '1.2', fontWeight: '700' }], // Bold
        h2: ['27.65px', { lineHeight: '1.2', fontWeight: '700' }], // Bold
        h3: ['23.04px', { lineHeight: '1.2', fontWeight: '700' }], // Bold

        link: ['18px', { lineHeight: '1.2', fontWeight: '700' }], // Semibold
        intro: ['19.2px', { lineHeight: '1.2', fontWeight: '400' }], // Normal
        body: ['16px', { lineHeight: '1.2', fontWeight: '400' }], // Normal
        small: ['13.33px', { lineHeight: '1.2', fontWeight: '400' }], // Normal
      },
    },
  },
  plugins: [],
}
