import type { Config } from 'tailwindcss';
import ariaComponents from 'tailwindcss-react-aria-components';

export default {
  content: [],
  darkMode: 'class',
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--app-bg)',
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
      app: 'var(--app-fg)',
    }),
    extend: {},
  },
  plugins: [ariaComponents()],
} satisfies Config;
