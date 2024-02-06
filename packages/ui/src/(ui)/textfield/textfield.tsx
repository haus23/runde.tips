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
import { focusRingStyles } from '../base-styles';

function _Label({ className, ...props }: LabelProps) {
  return <Label {...props} className={twMerge('', className)} />;
}

function _Input({ className, ...props }: InputProps) {
  return (
    <Input {...props} className={composeTailwindRenderProps(className, '')} />
  );
}

function _Description({ className, ...props }: TextProps) {
  return (
    <Text {...props} slot="description" className={twMerge('', className)} />
  );
}

function _FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <FieldError
      {...props}
      className={composeTailwindRenderProps(className, '')}
    />
  );
}

const inputStyles = tv({
  extend: focusRingStyles,
  base: [''],
});

interface _TextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function _TextField({
  label,
  description,
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
      <_Input className={inputStyles} />
      {description && <_Description>{description}</_Description>}
      <_FieldError>{errorMessage}</_FieldError>
    </TextField>
  );
}

export { _TextField as TextField };
