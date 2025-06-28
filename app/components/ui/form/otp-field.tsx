import { TriangleAlertIcon } from 'lucide-react';
import type { TextFieldProps as _TextFieldProps } from 'react-aria-components';
import {
  TextField as _TextField,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';
import { cva } from '~/utils/cva';
import { OtpInput } from '../otp-input';

const otpField = cva({
  base: ['flex flex-col gap-2'],
});

interface OtpFieldProps extends _TextFieldProps {
  description?: string;
  label?: string;
  length: number;
  onComplete?: () => unknown;
}

export function OtpField({
  className,
  description,
  label,
  length,
  onComplete,
  ...props
}: OtpFieldProps) {
  return (
    <_TextField
      className={otpField({ className })}
      isRequired
      minLength={length}
      {...props}
    >
      {!!label && <Label className="font-semibold text-sm">{label}</Label>}
      {!!description && (
        <Text className="pl-4 text-sm" slot="description">
          {description}
        </Text>
      )}
      <FieldError className="pl-4 text-sm">
        {({ defaultChildren, validationDetails }) => (
          <div className="flex items-center gap-2">
            <TriangleAlertIcon className="size-5 shrink-0" />
            <p>
              {validationDetails.tooShort
                ? 'Ein gültiger Code hat genau sechs Zeichen. Sonst klappt das nicht.'
                : validationDetails.valueMissing
                  ? 'Ohne Code kein Zutritt. Netter Versuch.'
                  : defaultChildren}
            </p>
          </div>
        )}
      </FieldError>
      <OtpInput length={length} onComplete={onComplete} />
    </_TextField>
  );
}
