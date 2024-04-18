import {
  Input,
  type InputProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { fieldBorderStyles } from './styles';

const inputStyles = tv({
  extend: fieldBorderStyles,
  base: 'min-w-0 flex-1 bg-app px-2 py-1.5 text-app text-sm placeholder:text-app-notice',
});

function _Input({ className, ...props }: InputProps) {
  return (
    <Input
      className={composeRenderProps(className, (className, renderProps) =>
        inputStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

export { _Input as Input };
