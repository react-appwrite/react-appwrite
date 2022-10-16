const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.yellow,
      orange: colors.orange,
    },

    container: {
      center: true,
      padding: '1rem',
    }
  },

  typography: ({ theme }) => ({
    DEFAULT: {
      css: {
        '--tw-prose-links': theme('colors.blue[600]'),
      }
    }
  }),

  plugins: [
    require('@tailwindcss/typography'),
  ],
}