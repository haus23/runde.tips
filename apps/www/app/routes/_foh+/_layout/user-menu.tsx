import {
  Button,
  Icon,
  type IconName,
  type Key,
  Menu,
  MenuItem,
  MenuItems,
} from '@tipprunde/ui';
import type { ColorScheme } from '#app/types';
import { includes } from '#app/utils/misc';
import { useTheme } from '#app/utils/theme';

const colorSchemes: {
  name: ColorScheme | 'system';
  label: string;
  icon: IconName;
}[] = [
  { name: 'light', label: 'Hell', icon: 'lucide/sun' },
  { name: 'dark', label: 'Dunkel', icon: 'lucide/moon' },
  { name: 'system', label: 'System', icon: 'lucide/laptop' },
];

export function UserMenu() {
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
      <Button variant="toolbar">
        <Icon name="lucide/user" />
      </Button>
      <MenuItems placement="bottom" showArrow>
        <MenuItem className="cursor-pointer" href="/logout">
          Log Out
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
