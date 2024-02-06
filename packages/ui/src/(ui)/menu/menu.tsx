import cx from 'clsx';
import {
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  composeRenderProps,
} from 'react-aria-components';

import { itemStyles } from '../base-styles';

import { Icon } from '../../components/icon/icon';
import { Popover, type PopoverProps } from '../popover/popover';

interface _MenuProps<T> extends MenuProps<T> {
  placement?: PopoverProps['placement'];
  showArrow?: PopoverProps['showArrow'];
}

function _MenuItems<T extends object>({
  placement,
  showArrow,
  ...props
}: _MenuProps<T>) {
  return (
    <Popover
      placement={placement}
      showArrow={showArrow}
      className="min-w-[150px]"
    >
      <Menu
        {...props}
        className="p-1 outline-0 max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]"
      />
    </Popover>
  );
}

interface _MenuItemProps extends MenuItemProps {
  check?: 'left' | 'right';
}

function _MenuItem({ check = 'left', ...props }: _MenuItemProps) {
  return (
    <MenuItem {...props} className={itemStyles}>
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected }) => (
          <>
            {selectionMode !== 'none' && (
              <span
                className={cx(
                  'flex items-center w-4',
                  check === 'left' ? 'order-0' : 'order-1',
                )}
              >
                {isSelected && <Icon name="lucide/check" aria-hidden />}
              </span>
            )}
            <span className="flex-1 flex items-center gap-2 truncate font-normal group-selected:font-semibold">
              {children}
            </span>
          </>
        ),
      )}
    </MenuItem>
  );
}

export { MenuTrigger as Menu, _MenuItems as MenuItems, _MenuItem as MenuItem };
