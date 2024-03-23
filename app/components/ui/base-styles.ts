import { tv } from 'tailwind-variants';

export const focusRingStyles = tv({
  base: 'focus:outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-2 ring-offset-2 ring-default ring-offset-default',
    },
  },
});

export const fieldBorderStyles = tv({
  base: 'border-default forced-colors:border-[ButtonBorder]',
  variants: {
    isFocusWithin: {
      true: 'border-focused forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-error forced-colors:border-[Mark]',
    },
  },
});
