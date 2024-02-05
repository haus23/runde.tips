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
    }),
    ringColor: ({ theme }) => ({
      ...theme('colors'),
      cn: 'var(--cn-ring)',
    }),
    ringOffsetColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--app-bg)',
    }),
    textColor: ({ theme }) => ({
      ...theme('colors'),
      app: {
        DEFAULT: 'var(--app-fg)',
        subtle: 'var(--app-fg-subtle)',
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
