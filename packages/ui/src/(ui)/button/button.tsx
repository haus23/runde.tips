import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { focusRingStyles } from '../base-styles';

const styles = tv({
  extend: focusRingStyles,
  base: 'flex items-center px-4 py-2 rounded-md text-center cursor-default',
  variants: {
    variant: {
      neutral: 'bg-cn hover:bg-cn-hover pressed:bg-cn-active',
      accent: 'bg-ca hover:bg-ca-hover pressed:bg-ca-active',
      toolbar: 'p-2 rounded-lg bg-ca hover:bg-ca-hover pressed:bg-ca-active',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

interface _ButtonProps
  extends ButtonProps,
    Pick<VariantProps<typeof styles>, 'variant'> {}

function _Button({ className, variant, ...props }: _ButtonProps) {
  return (
    <Button
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, className }),
      )}
    />
  );
}

export { _Button as Button };
