import { Button, Icon, Menu, MenuItem, MenuItems } from '#components';
import { useUser } from '#utils/auth/user';

export function UserMenu() {
  const user = useUser();

  return (
    <Menu>
      <Button variant="toolbar">
        <Icon name="lucide/user" />
      </Button>
      <MenuItems placement="bottom" showArrow>
        {user.role.includes('ADMIN') && (
          <MenuItem className="cursor-pointer" href="/manager">
            <Icon name="lucide/settings">Manager</Icon>
          </MenuItem>
        )}
        <MenuItem className="cursor-pointer" href="/logout">
          <Icon name="lucide/log-out">Log Out</Icon>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
