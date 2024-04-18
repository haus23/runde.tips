import { createContext } from 'react';
import {
  TextField,
  type TextFieldProps,
  composeRenderProps,
} from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';

const textFieldStyles = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: 'flex-row items-center gap-2',
      vertical: 'flex-col gap-1.5',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export const TextFieldVariantContext = createContext<
  VariantProps<typeof textFieldStyles> | undefined
>(undefined);

interface _TextFieldProps
  extends TextFieldProps,
    VariantProps<typeof textFieldStyles> {}

function _TextField({ className, orientation, ...props }: _TextFieldProps) {
  return (
    <TextFieldVariantContext.Provider value={{ orientation }}>
      <TextField
        className={composeRenderProps(className, (className, renderProps) =>
          textFieldStyles({ ...renderProps, orientation, className }),
        )}
        {...props}
      />
    </TextFieldVariantContext.Provider>
  );
}

export { _TextField as TextField };
