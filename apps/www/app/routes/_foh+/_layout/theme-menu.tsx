import {
  Button,
  Icon,
  type IconName,
  type Key,
  Menu,
  MenuItem,
  MenuItems,
} from '@tipprunde/ui';
import { type ColorScheme, useTheme } from '@tipprunde/utils/theme';
import cx from 'clsx';
import { includes } from '#utils/misc';

const colorSchemes: {
  name: ColorScheme | 'system';
  label: string;
  icon: IconName;
}[] = [
  { name: 'light', label: 'Light', icon: 'lucide/sun' },
  { name: 'dark', label: 'Dark', icon: 'lucide/moon' },
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

  return (
    <Menu>
      <Button
        variant="toolbar"
        className={cx('overflow-clip', mode === 'client' && 'text-app-subtle')}
      >
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
      <MenuItems
        placement="bottom"
        selectionMode="single"
        selectedKeys={selectedColorScheme}
        onAction={handleAction}
      >
        {colorSchemes.map((cs) => (
          <MenuItem key={cs.name} id={cs.name} check="right">
            <Icon name={cs.icon} />
            <span>{cs.label}</span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
