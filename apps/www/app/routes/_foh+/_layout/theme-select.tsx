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

export function ThemeSelect() {
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
      key !== theme.colorScheme && setTheme({ ...theme, colorScheme: key });
    }
  }

  return (
    <Menu>
      <Button variant="toolbar">
        <Icon name="lucide/sun" className="dark:hidden block" />
        <Icon name="lucide/moon" className="hidden dark:block" />
      </Button>
      <MenuItems
        selectionMode="single"
        selectedKeys={selectedColorScheme}
        onAction={handleAction}
      >
        {colorSchemes.map((cs) => (
          <MenuItem key={cs.name} id={cs.name}>
            <div>
              <span>{cs.label}</span>
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
