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
      component: {
        DEFAULT: 'var(--background-color-component)',
        hover: 'var(--background-color-component-hover)',
        accent: {
          DEFAULT: 'var(--background-color-component-accent)',
          hover: 'var(--background-color-component-accent-hover)',
        },
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
    }),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--border-color-default)',
      ring: 'var(--border-color-ring)',
      focused: 'var(--border-color-focused)',
      error: 'var(--border-color-error)',
    }),
    divideColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--divide-color-default)',
    }),
    fill: ({ theme }) => ({
      ...theme('colors'),
      none: 'none',
      popover: 'var(--fill-color-popover)',
    }),
    ringColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--default-ring-color)',
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme('colors'),
      default: 'var(--default-ring-offset-color)',
      card: 'var(--background-color-card)',
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
      selected: 'var(--text-color-accent)',
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
