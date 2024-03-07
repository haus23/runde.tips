import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import { useSubmit } from '@remix-run/react';
import type { Key } from 'react';
import { Icon, type IconName } from '#components';
import { useUser } from '#utils/auth/user';

const menuItems: {
  name: string;
  label: string;
  icon: IconName;
  isManager?: boolean;
  href?: string;
}[] = [
  {
    name: 'manager',
    label: 'Manager',
    icon: 'lucide/settings',
    isManager: true,
    href: '/manager',
  },
  { name: 'logout', label: 'Log Out', icon: 'lucide/log-out' },
];

export function UserMenu() {
  const submit = useSubmit();
  const user = useUser();

  const items = menuItems.filter(
    (mi) => !mi.isManager || mi.isManager === user.role.includes('ADMIN'),
  );

  function handleAction(key: Key) {
    if (key === 'logout') {
      submit(null, { method: 'post', action: '/logout' });
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="ghost">
          <Icon name="lucide/user" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Menu"
        onAction={handleAction}
        items={items}
      >
        {(item) => (
          <DropdownItem
            key={item.name}
            startContent={<Icon name={item.icon} />}
            {...(item.href && { href: item.href })}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
