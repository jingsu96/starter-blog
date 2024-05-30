// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
        white: '#ffffff',
        black: '#000000',
        neutral: 'var(--jt-c-neutral)',
        'neutral-inverse': 'var(--jt-c-neutral-inverse)',
        'gray-jt': {
          1: 'var(--jt-c-gray-1)',
          2: 'var(--jt-c-gray-2)',
          3: 'var(--jt-c-gray-3)',
          soft: 'var(--jt-c-gray-soft)',
        },
        indigo: {
          1: 'var(--jt-c-indigo-1)',
          2: 'var(--jt-c-indigo-2)',
          3: 'var(--jt-c-indigo-3)',
          soft: 'var(--jt-c-indigo-soft)',
        },
        green: {
          1: 'var(--jt-c-green-1)',
          2: 'var(--jt-c-green-2)',
          3: 'var(--jt-c-green-3)',
          soft: 'var(--jt-c-green-soft)',
        },
        yellow: {
          1: 'var(--jt-c-yellow-1)',
          2: 'var(--jt-c-yellow-2)',
          3: 'var(--jt-c-yellow-3)',
          soft: 'var(--jt-c-yellow-soft)',
        },
        red: {
          1: 'var(--jt-c-red-1)',
          2: 'var(--jt-c-red-2)',
          3: 'var(--jt-c-red-3)',
          soft: 'var(--jt-c-red-soft)',
        },
        sponsor: '#db2777',
        bg: {
          primary: 'var(--jt-c-bg)',
          alt: 'var(--jt-c-bg-alt)',
          elv: 'var(--jt-c-bg-elv)',
          soft: 'var(--jt-c-bg-soft)',
        },
        border: 'var(--jt-c-border)',
        divider: 'var(--jt-c-divider)',
        gutter: 'var(--jt-c-gutter)',
        text: {
          1: 'var(--jt-c-text-1)',
          2: 'var(--jt-c-text-2)',
          3: 'var(--jt-c-text-3)',
        },
        default: {
          1: 'var(--jt-c-default-1)',
          2: 'var(--jt-c-default-2)',
          3: 'var(--jt-c-default-3)',
          soft: 'var(--jt-c-default-soft)',
        },
        brand: {
          1: 'var(--jt-c-brand-1)',
          2: 'var(--jt-c-brand-2)',
          3: 'var(--jt-c-brand-3)',
          soft: 'var(--jt-c-brand-soft)',
          DEFAULT: 'var(--jt-c-brand)',
        },
        tip: {
          1: 'var(--jt-c-tip-1)',
          2: 'var(--jt-c-tip-2)',
          3: 'var(--jt-c-tip-3)',
          soft: 'var(--jt-c-tip-soft)',
        },
        warning: {
          1: 'var(--jt-c-warning-1)',
          2: 'var(--jt-c-warning-2)',
          3: 'var(--jt-c-warning-3)',
          soft: 'var(--jt-c-warning-soft)',
        },
        danger: {
          1: 'var(--jt-c-danger-1)',
          2: 'var(--jt-c-danger-2)',
          3: 'var(--jt-c-danger-3)',
          soft: 'var(--jt-c-danger-soft)',
        },
      },
      boxShadow: {
        jt1: 'var(--jt-shadow-1)',
        jt2: 'var(--jt-shadow-2)',
        jt3: 'var(--jt-shadow-3)',
        jt4: 'var(--jt-shadow-4)',
        jt5: 'var(--jt-shadow-5)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
      },
      screens: {
        '3xl': '1700px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
