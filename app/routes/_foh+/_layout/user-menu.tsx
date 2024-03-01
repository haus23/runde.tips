import { useSubmit } from '@remix-run/react';
import { Button, Icon, type Key, Menu, MenuItem, MenuItems } from '#components';
import { useUser } from '#utils/auth/user';

export function UserMenu() {
  const submit = useSubmit();
  const user = useUser();

  function handleAction(key: Key) {
    if (key === 'logout') {
      submit(null, { method: 'post', action: '/logout' });
    }
  }

  return (
    <Menu>
      <Button variant="toolbar">
        <Icon name="lucide/user" />
      </Button>
      <MenuItems onAction={handleAction} placement="bottom" showArrow>
        {user.role.includes('ADMIN') && (
          <MenuItem className="cursor-pointer" href="/manager">
            <Icon name="lucide/settings">Manager</Icon>
          </MenuItem>
        )}
        <MenuItem id="logout" className="cursor-pointer">
          <Icon name="lucide/log-out">Log Out</Icon>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
