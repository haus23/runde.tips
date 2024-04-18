import { tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

export const fieldBorderStyles = tv({
  extend: focusRingStyles,
  base: [
    'rounded-md border-2', // Future: refactor to usages?
    'border-default transition-colors forced-colors:border-[ButtonBorder]',
  ],
  variants: {
    isFocused: {
      true: 'border-focused forced-colors:border-[Highlight]',
    },
  },
});
