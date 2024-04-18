import { useContext } from 'react';
import { Label, type LabelProps } from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';
import { TextFieldVariantContext } from './text-field';

const labelStyles = tv({
  base: 'w-fit font-medium text-app-subtle text-sm',
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

interface _LabelProps extends LabelProps, VariantProps<typeof labelStyles> {}

function _Label({ className, orientation, ...props }: _LabelProps) {
  const textFieldVariant = useContext(TextFieldVariantContext);
  orientation = orientation ?? textFieldVariant?.orientation;

  return (
    <Label className={labelStyles({ orientation, className })} {...props} />
  );
}

export { _Label as Label };
