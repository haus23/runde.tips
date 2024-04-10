import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const styles = tv({
  extend: focusRingStyles,
  base: 'flex items-center px-4 py-2 transition pressed:scale-95 cursor-default rounded-lg font-semibold',
  variants: {
    color: {
      neutral: '',
      accent: '',
    },
    variant: {
      solid: '',
      outline: '',
      toolbar: 'p-2 bg-transparent border-2 rounded-xl',
      trigger: '',
    },
    isDisabled: {
      true: 'opacity-40 forced-colors:text-[GrayText]',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'neutral',
      className: 'bg-component hover:bg-component-hover text-white',
    },
    {
      variant: 'solid',
      color: 'accent',
      className:
        'bg-component-accent hover:bg-component-accent-hover text-white',
    },
    {
      variant: 'toolbar',
      color: 'neutral',
      className: 'hover:bg-content-hover border-default',
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
