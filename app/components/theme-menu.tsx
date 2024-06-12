import cx from 'clsx';
import { type Key, Menu, MenuItem, MenuTrigger } from 'react-aria-components';

import { twMerge } from 'tailwind-merge';
import { includes } from '#utils/misc';
import { type ColorScheme, useTheme } from '#utils/theme/theme';
import UI from './ui';
import { Popover } from './ui/popover/popover';
import type { IconName } from './ui/types';

const colorSchemes: {
  name: ColorScheme | 'system';
  label: string;
  icon: IconName;
}[] = [
  { name: 'light', label: 'Hell', icon: 'lucide/sun' },
  { name: 'dark', label: 'Dunkel', icon: 'lucide/moon' },
  { name: 'system', label: 'System', icon: 'lucide/laptop' },
];

export function ThemeMenu() {
  const { theme, mode, setTheme } = useTheme();

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
    }
  }

  const showArrow = true;
  const check = 'right';

  return (
    <MenuTrigger>
      <UI.Button
        variant="toolbar"
        className={cx(
          'overflow-clip aria-expanded:opacity-70',
          mode === 'client' && 'text-app-subtle',
        )}
      >
        <div className="relative size-5">
          <UI.Icon
            name="lucide/moon"
            className={twMerge(
              'absolute inset-0 origin-[50%_100px] rotate-90 transform transition-transform duration-300',
              theme.colorScheme === 'dark' && 'rotate-0',
            )}
          />
          <UI.Icon
            name="lucide/sun"
            className={twMerge(
              '-rotate-90 absolute inset-0 origin-[50%_100px] transform transition-transform duration-300',
              theme.colorScheme === 'light' && 'rotate-0',
            )}
          />
        </div>
      </UI.Button>
      <Popover placement="bottom">
        <Menu
          className="w-[180px] p-1.5"
          selectionMode="single"
          selectedKeys={selectedColorScheme}
          onAction={handleAction}
        >
          {colorSchemes.map((cs) => (
            <MenuItem
              key={cs.name}
              id={cs.name}
              className={({ isFocused, isSelected }) =>
                twMerge(
                  'flex select-none items-center justify-between gap-4 rounded-lg py-2 pr-1 pl-3 text-sm outline-none transition-colors',
                  isFocused && 'bg-content-hover',
                  isSelected && 'text-selected',
                )
              }
            >
              {({ isSelected }) => (
                <>
                  <UI.Icon name={cs.icon}>{cs.label}</UI.Icon>
                  {isSelected && <UI.Icon name="lucide/check" aria-hidden />}
                </>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
