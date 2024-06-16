import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const styles = tv({
  extend: focusRingStyles,
  base: 'flex cursor-default items-center rounded-lg px-4 py-2 font-semibold transition pressed:scale-95',
  variants: {
    color: {
      neutral: '',
      accent: '',
    },
    variant: {
      solid: '',
      outline: '',
      toolbar: 'rounded-xl border-2 bg-transparent p-2',
      select: 'flex justify-between pressed:scale-100',
      trigger: 'rounded bg-transparent px-1 py-0.5',
    },
    isDisabled: {
      true: 'opacity-40 forced-colors:text-[GrayText]',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'neutral',
      className: 'bg-component text-white hover:bg-component-hover',
    },
    {
      variant: 'solid',
      color: 'accent',
      className:
        'bg-component-accent text-white hover:bg-component-accent-hover',
    },
    {
      variant: 'toolbar',
      color: 'neutral',
      className: 'border-default hover:bg-content-hover',
    },
    {
      variant: 'select',
      color: 'neutral',
      className: 'bg-component text-white hover:bg-component-hover',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'neutral',
  },
});

interface _ButtonProps
  extends ButtonProps,
    Pick<VariantProps<typeof styles>, 'variant' | 'color'> {}

function _Button({ className, variant, color, ...props }: _ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, color, className }),
      )}
    />
  );
}

export { _Button as Button };
