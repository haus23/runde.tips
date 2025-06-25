import { TriangleAlertIcon } from 'lucide-react';
import type { TextFieldProps as _TextFieldProps } from 'react-aria-components';
import {
  TextField as _TextField,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';
import { cva } from '~/utils/cva';
import { Input } from '../input';

const textField = cva({
  base: ['flex flex-col gap-2'],
});

interface TextFieldProps extends _TextFieldProps {
  description?: string;
  label?: string;
}

export function TextField({
  className,
  description,
  label,
  ...props
}: TextFieldProps) {
  return (
    <_TextField className={textField({ className })} {...props}>
      {!!label && <Label className="font-semibold text-sm">{label}</Label>}
      {!!description && (
        <Text className="pl-4 text-sm" slot="description">
          {description}
        </Text>
      )}
      <FieldError className="pl-4 text-sm">
        {({ defaultChildren }) => (
          <div className="flex items-center gap-2">
            <TriangleAlertIcon className="size-5 shrink-0" />
            <p>{defaultChildren}</p>
          </div>
        )}
      </FieldError>
      <Input />
    </_TextField>
  );
}
