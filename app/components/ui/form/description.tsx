import { Text, type TextProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const descriptionStyles = tv({
  base: 'text-app-notice text-xs ml-1',
});

function Description({ className, ...props }: TextProps) {
  return (
    <Text
      slot="description"
      className={descriptionStyles({ className })}
      {...props}
    />
  );
}

export { Description };
