import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
  type TextFieldProps,
} from 'react-aria-components';

function _TextField({ ...props }: TextFieldProps) {
  return (
    <TextField {...props}>
      <Label />
      <Input />
      <Text slot="description" />
      <FieldError />
    </TextField>
  );
}

export { _TextField as TextField };
