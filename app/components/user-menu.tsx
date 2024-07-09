import { useSubmit } from '@remix-run/react';
import {
  type Key,
  Menu,
  MenuItem,
  MenuTrigger,
  OverlayArrow,
} from 'react-aria-components';
import { useUser } from '#utils/auth/auth';
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
      <Popover placement="bottom" offset={10} containerPadding={6}>
        <OverlayArrow className="group">
          <svg
            role="img"
            aria-label="Kleiner Pfeil"
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-left:-rotate-90 block fill-popover stroke-1 stroke-border-default group-placement-bottom:rotate-180 group-placement-right:rotate-90"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
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
