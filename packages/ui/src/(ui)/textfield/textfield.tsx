import type {
  FieldErrorProps,
  InputProps,
  LabelProps,
  TextFieldProps,
  TextProps,
  ValidationResult,
} from 'react-aria-components';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps } from '../../utils';
import { fieldBorderStyles, focusRingStyles } from '../base-styles';

function _Label({ className, ...props }: LabelProps) {
  return (
    <Label
      {...props}
      className={twMerge(
        'font-medium cursor-default w-fit text-app-subtle',
        className,
      )}
    />
  );
}

function _Input({ className, ...props }: InputProps) {
  return (
    <Input
      {...props}
      className={composeTailwindRenderProps(
        className,
        'px-2 py-1.5 flex-1 min-w-0 outline outline-0 bg-app-stressed text-app disabled:text-app-subtle disabled:bg-app-subtle',
      )}
    />
  );
}

function _Description({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge('mt-1 text-sm text-app-notice', className)}
    />
  );
}

function _FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldError
      {...props}
      className={composeTailwindRenderProps(
        className,
        'mt-1 text-sm text-app-error',
      )}
    />
  );
}

const inputStyles = tv({
  base: 'border-2 rounded-md placeholder:text-app-notice',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

interface _TextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function _TextField({
  label,
  description,
  placeholder,
  errorMessage,
  className,
  ...props
}: _TextFieldProps) {
  return (
    <TextField
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-1')}
    >
      {label && <_Label>{label}</_Label>}
      <_Input className={inputStyles} placeholder={placeholder} />
      {description && <_Description>{description}</_Description>}
      <_FieldError>{errorMessage}</_FieldError>
    </TextField>
  );
}

export { _TextField as TextField };
