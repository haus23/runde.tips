import {
  TextField,
  type TextFieldProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const textFieldStyles = tv({});

function _TextField({ className, ...props }: TextFieldProps) {
  return (
    <TextField
      className={composeRenderProps(className, (className, renderProps) =>
        textFieldStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

export { _TextField as TextField };
