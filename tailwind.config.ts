import type { Config } from 'tailwindcss';
import ariaComponents from 'tailwindcss-react-aria-components';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--background-color-app)',
        subtle: 'var(--background-color-app-subtle)',
      },
      content: {
        DEFAULT: 'var(--background-color-content)',
        hover: 'var(--background-color-content-hover)',
        active: 'var(--background-color-content-active)',
      },
      accent: 'var(--background-color-accent)',
      card: 'var(--background-color-card)',
      divider: 'var(--divide-color-default)',
      popover: 'var(--background-color-popover)',
      acs: {
        DEFAULT: 'var(--background-color-acs)',
        hover: 'var(--background-color-acs-hover)',
      },
    }),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--border-color-default)',
      focused: 'var(--border-color-focused)',
      error: 'var(--border-color-error)',
    }),
    divideColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--divide-color-default)',
    }),
    fill: ({ theme }) => ({
      ...theme('colors'),
      popover: 'var(--fill-color-popover)',
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
      'border-default': 'var(--stroke-color-border-default)',
    }),
    textColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--text-color-app)',
        subtle: 'var(--text-color-app-subtle)',
        notice: 'var(--text-color-app-notice)',
      },
      accent: {
        DEFAULT: 'var(--text-color-accent)',
      },
      error: 'var(--text-color-error)',
    }),
    extend: {
      boxShadow: {
        small: 'var(--ui-box-shadow-medium)',
        medium: 'var(--ui-box-shadow-medium)',
        large: 'var(--ui-box-shadow-medium)',
      },
    },
  },
  plugins: [ariaComponents()],
} satisfies Config;
