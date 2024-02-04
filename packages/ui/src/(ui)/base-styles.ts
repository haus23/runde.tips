import { tv } from 'tailwind-variants';

export const focusRing = tv({
  base: 'focus:outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-2 ring-offset-2 ring-cn ring-offset-app',
    },
  },
});
