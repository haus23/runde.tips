import { Popover, type PopoverProps } from 'react-aria-components';

interface _PopoverProps extends PopoverProps {}

function _Popover({ children }: _PopoverProps) {
  return <Popover>{children}</Popover>;
}

export { _Popover as Popover, type _PopoverProps as PopoverProps };
