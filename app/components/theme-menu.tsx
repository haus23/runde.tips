import cx from 'clsx';
import { type Key, Menu, MenuItem, MenuTrigger } from 'react-aria-components';

import { twMerge } from 'tailwind-merge';
import { includes } from '#utils/misc';
import { type ColorScheme, useTheme } from '#utils/theme/theme';
import { Button, Icon, type IconName } from './ui';
import { Popover } from './ui/popover/popover';

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
      <Button
        variant="toolbar"
        className={cx(
          'aria-expanded:opacity-70 overflow-clip',
          mode === 'client' && 'text-app-subtle',
        )}
      >
        <div className="relative size-5">
          <Icon
            name="lucide/moon"
            className={twMerge(
              'absolute inset-0 origin-[50%_100px] rotate-90 transform transition-transform duration-300',
              theme.colorScheme === 'dark' && 'rotate-0',
            )}
          />
          <Icon
            name="lucide/sun"
            className={twMerge(
              'absolute inset-0 origin-[50%_100px] -rotate-90 transform transition-transform duration-300',
              theme.colorScheme === 'light' && 'rotate-0',
            )}
          />
        </div>
      </Button>
      <Popover placement="bottom">
        <Menu
          className="p-1.5 w-[180px]"
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
                  'flex items-center justify-between text-sm gap-4 select-none py-2 pl-3 pr-1 rounded-lg outline-none transition-colors',
                  isFocused && 'bg-content-hover',
                  isSelected && 'text-selected',
                )
              }
            >
              {({ isSelected }) => (
                <>
                  <Icon name={cs.icon}>{cs.label}</Icon>
                  {isSelected && <Icon name="lucide/check" aria-hidden />}
                </>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
