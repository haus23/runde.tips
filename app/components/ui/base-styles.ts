import { tv } from 'tailwind-variants';

export const focusRingStyles = tv({
  base: 'focus:outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-2 ring-offset-2 ring-default ring-offset-default',
    },
  },
});
