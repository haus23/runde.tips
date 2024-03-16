import {
  FieldError,
  Input,
  type InputProps,
  Label,
  type LabelProps,
  Text,
  TextField,
  type TextFieldProps,
  type ValidationResult,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { fieldBorderStyles, focusRingStyles } from '../base-styles';
import { composeTailwindRenderProps } from '../utils';

function LabelWrapper({ className, ...props }: LabelProps) {
  return (
    <Label
      {...props}
      className={twMerge(
        'text-sm text-app-subtle font-medium cursor-default w-fit',
        className,
      )}
    />
  );
}

function InputWrapper({ className, ...props }: InputProps) {
  return (
    <Input
      {...props}
      className={composeTailwindRenderProps(
        className,
        'px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-app text-sm text-app',
      )}
    />
  );
}

const inputStyles = tv({
  extend: focusRingStyles,
  base: ['border-2 rounded-md transition-colors', fieldBorderStyles.base],
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface _TextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  inputClassName?: string;
}

function _TextField({
  className,
  inputClassName,
  label,
  description,
  errorMessage,
  ...props
}: _TextFieldProps) {
  return (
    <TextField
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-1.5')}
    >
      {label && <LabelWrapper>{label}</LabelWrapper>}
      <InputWrapper
        className={composeRenderProps(
          inputClassName,
          (className, renderProps) =>
            inputStyles({ ...renderProps, className }),
        )}
      />
      <Text slot="description" />
      <FieldError />
    </TextField>
  );
}

export { _TextField as TextField };
