import { useContext } from 'react';
import { FieldErrorContext, Text, type TextProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const descriptionStyles = tv({
  base: 'ml-1 text-app-notice text-xs',
});

interface DescriptionProps extends TextProps {
  hideOnError?: boolean;
}

function Description({ className, hideOnError, ...props }: DescriptionProps) {
  hideOnError ??= true;

  const validation = useContext(FieldErrorContext);

  if (hideOnError && validation?.isInvalid) {
    return null;
  }

  return (
    <Text
      slot="description"
      className={descriptionStyles({ className })}
      {...props}
    />
  );
}

export { Description };
