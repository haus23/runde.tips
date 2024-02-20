import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const styles = tv({
  extend: focusRingStyles,
  base: 'flex items-center font-semibold px-4 py-2 rounded-md text-center cursor-default',
  variants: {
    color: {
      neutral: '',
      accent: '',
    },
    variant: {
      solid: 'text-white',
      outline: '',
      toolbar: 'p-2 rounded-lg border-neutral border',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'neutral',
      className:
        'bg-cn-solid hover:bg-cn-solid-hover pressed:component-pressed',
    },
    {
      variant: 'solid',
      color: 'accent',
      className:
        'bg-ca-solid hover:bg-ca-solid-hover pressed:component-pressed',
    },
    {
      variant: 'toolbar',
      color: 'neutral',
      className:
        'hover:bg-cn-hover pressed:bg-cn-hover pressed:component-pressed',
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
