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
        backgroundColor: '#16161a',
        backgroundColorLight: '#242629',
        backgroundColorWhite: '#e5e7eb',
        primaryColor: '#7f5af0',
        titleColor: '#fffffe',
        textColor: '#94a1b2',
        errorColor: '#ff6b6b',
        successColor: '#4ade80',
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
