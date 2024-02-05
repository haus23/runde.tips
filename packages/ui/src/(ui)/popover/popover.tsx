import {
  Popover,
  type PopoverProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const popover = tv({
  base: [
    'bg-cn backdrop-blur-2xl backdrop-saturate-200',
    'shadow-2xl rounded-xl bg-clip-padding border border-neutral text-app-subtle',
  ],
});

interface _PopoverProps extends PopoverProps {}

function _Popover({ children, className, ...props }: _PopoverProps) {
  return (
    <Popover
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        popover({ ...renderProps, className }),
      )}
    >
      {children}
    </Popover>
  );
}

export { _Popover as Popover, type _PopoverProps as PopoverProps };
