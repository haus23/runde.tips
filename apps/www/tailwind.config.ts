import sharedConfig from '@tipprunde/tailwind-config';
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [sharedConfig],
} satisfies Config;
