import type { Config } from 'tailwindcss';
import ui from 'ui/tailwind.config.ts';

export default {
  presets: [ui],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
} satisfies Config;
