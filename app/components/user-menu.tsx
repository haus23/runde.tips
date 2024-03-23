import { useSubmit } from '@remix-run/react';
import { type Key, Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import { useUser } from '#utils/auth/user';
import { Button, Icon } from './ui';
import { Popover } from './ui/popover/popover';

export function UserMenu() {
  const submit = useSubmit();
  const user = useUser();

  function handleAction(key: Key) {
    if (key === 'logout') {
      submit(null, { method: 'post', action: '/logout' });
    }
  }

  return (
    <MenuTrigger>
      <Button variant="toolbar" className="aria-expanded:opacity-70">
        <Icon name="lucide/user" />
      </Button>
      <Popover placement="bottom">
        <Menu className="p-1.5 w-[180px] outline-none" onAction={handleAction}>
          <MenuItem
            id="logout"
            className="text-sm select-none cursor-pointer py-2 pl-3 pr-1 rounded-lg outline-none transition-colors data-[focused]:bg-content-hover"
          >
            <Icon name="lucide/log-out">Log Out</Icon>
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
