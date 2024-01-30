import type { Config } from 'tailwindcss';

export default {
  content: [],
  darkMode: 'class',
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--app-bg)',
    }),
    textColor: ({ theme }) => ({
      ...theme('colors'),
      app: 'var(--app-fg)',
    }),
    extend: {},
  },
  plugins: [],
} satisfies Config;
