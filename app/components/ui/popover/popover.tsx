import {
  Popover,
  type PopoverProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: [
    'rounded-xl border border-default bg-popover shadow-medium',
    'forced-colors:bg-[Canvas]',
  ],
});

function _Popover({ className, ...props }: PopoverProps) {
  return (
    <Popover
      ref={(ref) =>
        ref?.addEventListener('touchend', (e) => e.preventDefault())
      }
      offset={8}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

export { _Popover as Popover };
