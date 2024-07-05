import { Separator, type SeparatorProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const divider = tv({
  base: 'shrink-0 border-none bg-divider',
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

interface DividerProps extends SeparatorProps, VariantProps<typeof divider> {}

export function Divider({ className, orientation, ...props }: DividerProps) {
  return (
    <Separator
      orientation={orientation}
      className={twMerge(divider({ orientation }), className)}
      {...props}
    />
  );
}
