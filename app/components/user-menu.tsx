import { useSubmit } from '@remix-run/react';
import { type Key, Menu, MenuItem, MenuTrigger } from 'react-aria-components';
import { useUser } from '#utils/auth/user';
import UI from './ui';
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
      <UI.Button variant="toolbar" className="aria-expanded:opacity-70">
        <UI.Icon name="user" />
      </UI.Button>
      <Popover placement="bottom">
        <Menu className="w-[180px] p-1.5 outline-none" onAction={handleAction}>
          {user.role.includes('ADMIN') && (
            <MenuItem
              className="flex cursor-pointer select-none rounded-lg py-2 pr-1 pl-3 text-sm outline-none transition-colors data-[focused]:bg-content-hover"
              href="/manager"
            >
              <UI.Icon name="settings">Manager</UI.Icon>
            </MenuItem>
          )}
          <MenuItem
            id="logout"
            className="cursor-pointer select-none rounded-lg py-2 pr-1 pl-3 text-sm outline-none transition-colors data-[focused]:bg-content-hover"
          >
            <UI.Icon name="log-out">Log Out</UI.Icon>
          </MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
