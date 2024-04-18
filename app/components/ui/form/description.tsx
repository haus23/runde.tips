import { useContext } from 'react';
import {
  InputContext,
  Text,
  TextFieldContext,
  type TextProps,
  useSlottedContext,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const descriptionStyles = tv({
  base: 'ml-1 text-app-notice text-xs',
});

function Description({ className, ...props }: TextProps) {
  const ctx = useSlottedContext(InputContext);
  console.log(ctx);
  return (
    <Text
      slot="description"
      className={descriptionStyles({ className })}
      {...props}
    />
  );
}

export { Description };
