import {
  FieldError,
  type FieldErrorProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const fieldErrorStyles = tv({
  base: 'ml-1 text-error text-xs',
});

interface _FieldErrorProps extends FieldErrorProps {
  hideMessage?: boolean;
  errorMessage?: string;
}

function _FieldError({
  className,
  hideMessage,
  errorMessage,
  ...props
}: _FieldErrorProps) {
  return (
    <FieldError
      className={composeRenderProps(className, (className, renderProps) =>
        fieldErrorStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {(validationResult) =>
        hideMessage ? '' : errorMessage || validationResult.validationErrors
      }
    </FieldError>
  );
}

export { _FieldError as FieldError };
