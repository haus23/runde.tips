import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export const { compose, cva, cx } = defineConfig({
  hooks: {
    onComplete: (classes) => twMerge(classes),
  },
});

export type { ClassValue, VariantProps } from 'cva';
export { twMerge } from 'tailwind-merge';
