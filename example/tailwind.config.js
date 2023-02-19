const colors = require('tailwindcss/colors')

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      // gray: colors.neutral,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.yellow,
      orange: colors.orange,

      gray: {
        '100': '#111',
        '200': '#333',
        '300': '#444',
        '400': '#666',
        '500': '#888',
        '600': '#999',
        '700': '#EAEAEA',
        '800': '#FAFAFA',
      },

      success: {
        'DEFAULT': '#0070F3',
        '100': '#3291FF',
        '200': '#D3E5FF',
        '300': '#0070F3',
        '400': '#0761D1',
      },

      error: {
        'DEFAULT': 'red',
        '100': '#F7D4D6',
        '200': '#F33',
        '300': 'red',
        '400': '#E60000',
      },

      warning: {
        'DEFAULT': '#F5A623',
        '100': '#FFEFCF',
        '200': '#F7B955',
        '300': '#F5A623',
        '400': '#AB570A',
      },

      fuchsia: {
        'DEFAULT': '#F81CE5',
      },

      cyan: {
        'DEFAULT': '#50E3C2',
        '100': '#79FFE1',
        '200': '#50E3C2',
        '300': '#AAFFEC',
        '400': '#29BC9B',
      },
    },

    extend: {
      animation: {
        dots: 'dots 1.4s ease-in-out infinite',
      },

      keyframes: {
        dots: {
          '0%': {
            opacity: 0.2,
          },

          '20%': {
            opacity: 1,
          },

          '100%': {
            opacity: 0.2,
          },
        }
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'white',
            '--tw-prose-links': theme('colors.success[100]'),
            '--tw-prose-counters': theme('colors.gray[600]'),
          }
        }
      }),
    },

    container: {
      center: true,
      padding: '1rem',

      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
}