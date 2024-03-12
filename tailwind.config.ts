import type { Config } from 'tailwindcss';
import ariaComponents from 'tailwindcss-react-aria-components';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--background-color-app)',
      content: 'var(--background-color-content)',
      'btn-toolbar': 'var(--background-color-btn-toolbar)',
      ca: 'var(--background-color-ca)',
    }),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--border-color-default)',
      'btn-toolbar': 'var(--border-color-btn-toolbar)',
    }),
    divideColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--divide-color-default)',
    }),
    fill: ({ theme }) => ({
      ...theme('colors'),
    }),
    ringColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--default-ring-color)',
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--default-ring-offset-color)',
    }),
    stroke: ({ theme }) => ({
      ...theme('colors'),
    }),
    textColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--text-color-app)',
        subtle: 'var(--text-color-app-subtle)',
      },
    }),
    extend: {},
  },
  plugins: [ariaComponents()],
} satisfies Config;
