import { tv } from 'tailwind-variants';

export const focusRingStyles = tv({
  base: 'focus:outline-none',
  variants: {
    isFocusVisible: {
      true: 'ring-2 ring-offset-2 ring-ca ring-offset-app',
    },
  },
});

export const itemStyles = tv({
  base: [
    'group flex items-center gap-4 cursor-default select-none text-sm',
    'py-2 pl-3 pr-1 rounded-lg outline-none',
    'pressed:bg-cn-active',
  ],
  variants: {
    isFocused: {
      true: 'bg-cn-hover',
    },
    isSelected: {
      true: 'text-accent',
    },
  },
});

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: 'border-neutral',
      true: 'border-focus',
    },
    isInvalid: {
      true: 'border-error',
    },
    isDisabled: {
      true: 'border-disabled',
    },
  },
});
