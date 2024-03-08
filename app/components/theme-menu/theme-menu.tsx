import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import type { Key } from 'react';
import { Icon, type IconName } from '#components';
import { includes } from '#utils/misc';
import { type ColorScheme, useThemeLegacy } from '#utils/theme/theme.provider';

const colorSchemes: {
  name: ColorScheme | 'system';
  label: string;
  icon: IconName;
}[] = [
  { name: 'light', label: 'Hell', icon: 'lucide/sun' },
  { name: 'dark', label: 'Dunkel', icon: 'lucide/moon' },
  { name: 'system', label: 'System', icon: 'lucide/laptop' },
];

export function ThemeMenu({ onSelection }: { onSelection?: () => void }) {
  const { theme, mode, setTheme } = useThemeLegacy();

  const selectedColorScheme = new Set([
    mode === 'session' ? theme.colorScheme : 'system',
  ]);

  function handleAction(key: Key) {
    if (
      includes(
        colorSchemes.map((cs) => cs.name),
        key,
      )
    ) {
      !selectedColorScheme.has(key) && setTheme({ ...theme, colorScheme: key });
      onSelection?.();
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="ghost">
          <div className="relative size-5">
            <Icon
              name="lucide/moon"
              className="absolute inset-0 origin-[50%_100px] rotate-90 transform transition-transform duration-300 dark:rotate-0"
            />
            <Icon
              name="lucide/sun"
              className="absolute inset-0 origin-[50%_100px] rotate-0 transform transition-transform duration-300 dark:-rotate-90"
            />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Hell-/Dunkelmodus Auswahl"
        items={colorSchemes}
        onAction={handleAction}
        selectionMode="single"
        selectedKeys={selectedColorScheme}
      >
        {(item) => (
          <DropdownItem
            key={item.name}
            startContent={<Icon name={item.icon} />}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
