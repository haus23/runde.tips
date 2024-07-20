import { Input, type InputProps } from '@nextui-org/input';

function _Input({ errorMessage, ...props }: InputProps) {
  const isInvalid = !!errorMessage;
  const errMsg = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage;

  return (
    <Input
      isInvalid={isInvalid}
      errorMessage={errMsg}
      variant="faded"
      {...props}
    />
  );
}

export { _Input as Input };
