import cx from 'clsx';
import {
  type Key,
  Menu,
  MenuItem,
  MenuTrigger,
  OverlayArrow,
} from 'react-aria-components';

import { twMerge } from 'tailwind-merge';
import { includes } from '#utils/misc';
import { useTheme } from '#utils/theme/theme';
import type { Theme } from '#utils/theme/types';
import UI from './ui';
import { Popover } from './ui/popover/popover';
import type { IconName } from './ui/types';

const colorSchemes: {
  name: Theme['colorScheme'];
  label: string;
  icon: IconName;
}[] = [
  { name: 'light', label: 'Hell', icon: 'sun' },
  { name: 'dark', label: 'Dunkel', icon: 'moon' },
  { name: 'system', label: 'System', icon: 'laptop' },
];

export function ThemeMenu() {
  const { effectiveColorScheme, theme, mode, setTheme } = useTheme();

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
            name="moon"
            className={twMerge(
              'absolute inset-0 origin-[50%_100px] rotate-90 transform transition-transform duration-300',
              effectiveColorScheme === 'dark' && 'rotate-0',
            )}
          />
          <UI.Icon
            name="sun"
            className={twMerge(
              '-rotate-90 absolute inset-0 origin-[50%_100px] transform transition-transform duration-300',
              effectiveColorScheme === 'light' && 'rotate-0',
            )}
          />
        </div>
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
                  {isSelected && <UI.Icon name="check" aria-hidden />}
                </>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
