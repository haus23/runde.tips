import type { Config } from 'tailwindcss';
import ariaComponents from 'tailwindcss-react-aria-components';

export default {
  content: [],
  darkMode: 'class',
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--app-bg)',
        stressed: 'var(--app-bg-stressed)',
        subtle: 'var(--app-bg-subtle)',
      },
      // Component Neutral
      cn: {
        DEFAULT: 'var(--cn-bg)',
        hover: 'var(--cn-bg-hover)',
        active: 'var(--cn-bg-active)',
      },
      // Component Neutral
      ca: {
        DEFAULT: 'var(--ca-bg)',
        hover: 'var(--ca-bg-hover)',
        active: 'var(--ca-bg-active)',
      },
    }),
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      neutral: 'var(--border-neutral)',
      disabled: 'var(--border-disabled)',
      focus: 'var(--border-focus)',
      accent: 'var(--border-accent)',
      error: 'var(--border-error)',
    }),
    fill: ({ theme }) => ({
      ...theme('colors'),
      'app-subtle': 'var(--app-bg-subtle)',
    }),
    ringColor: ({ theme }) => ({
      ...theme('colors'),
      cn: 'var(--cn-ring)',
      ca: 'var(--ca-ring)',
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--app-bg)',
    }),
    stroke: ({ theme }) => ({
      ...theme('colors'),
      'border-neutral': 'var(--border-neutral)',
    }),
    textColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--app-fg)',
        subtle: 'var(--app-fg-subtle)',
        notice: 'var(--app-fg-notice)',
        error: 'var(--app-fg-error)',
      },
      accent: {
        DEFAULT: 'var(--accent-fg)',
        subtle: 'var(--accent-fg-subtle)',
      },
    }),
    extend: {},
  },
  plugins: [ariaComponents()],
} satisfies Config;
