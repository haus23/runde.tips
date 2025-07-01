import type { ButtonProps as _ButtonProps } from 'react-aria-components';
import { Button as _Button } from 'react-aria-components';
import type { VariantProps } from '~/utils/cva';
import { cva } from '~/utils/cva';

const button = cva({
  base: '',
  variants: {
    variant: {
      unset: null,
      primary: [],
      secondary: [],
      sidenav: ['flex items-center gap-1.5'],
    },
  },
  compoundVariants: [
    {
      variant: ['primary', 'secondary'],
      className: 'border px-4 py-2 transition-transform active:scale-95',
    },
  ],
  defaultVariants: {
    variant: 'unset',
  },
});

interface ButtonProps extends _ButtonProps, VariantProps<typeof button> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <_Button className={button({ className, variant })} {...props} />;
}
