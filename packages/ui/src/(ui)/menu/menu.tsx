import {
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  composeRenderProps,
} from 'react-aria-components';

import { dropdownItem } from '../base-styles';

import { Icon } from '../../components/icon/icon';
import { Popover, type PopoverProps } from '../popover/popover';

interface _MenuProps<T> extends MenuProps<T> {
  placement?: PopoverProps['placement'];
}

function _MenuItems<T extends object>(props: _MenuProps<T>) {
  return (
    <Popover placement={props.placement} className="min-w-[150px]">
      <Menu {...props} className="" />
    </Popover>
  );
}

function _MenuItem(props: MenuItemProps) {
  return (
    <MenuItem {...props} className={dropdownItem}>
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected }) => (
          <>
            {selectionMode !== 'none' && (
              <span>
                {isSelected && <Icon name="lucide/check" aria-hidden />}
              </span>
            )}
            <span>{children}</span>
          </>
        ),
      )}
    </MenuItem>
  );
}

export { MenuTrigger as Menu, _MenuItems as MenuItems, _MenuItem as MenuItem };
