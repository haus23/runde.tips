import type { ReactNode } from 'react';
import {
  OverlayArrow,
  Popover,
  type PopoverProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: [
    'bg-cn dark:backdrop-blur-2xl dark:backdrop-saturate-200',
    'shadow-2xl rounded-xl bg-clip-padding border border-neutral text-app-subtle',
  ],
});

interface _PopoverProps extends PopoverProps {
  children: ReactNode;
  showArrow?: boolean;
}

function _Popover({ children, className, showArrow, ...props }: _PopoverProps) {
  return (
    <Popover
      offset={16}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      <OverlayArrow className="group">
        {showArrow && (
          <svg
            role="img"
            aria-label="Kleiner Pfeil"
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="block fill-cn stroke-1 stroke-border-neutral group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        )}
      </OverlayArrow>
      {children}
    </Popover>
  );
}

export { _Popover as Popover, type _PopoverProps as PopoverProps };
