import type { Key } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Icon,
  type IconName,
  twMerge,
} from 'ui';
import { includes } from '#utils/misc';
import { useTheme } from '#utils/theme';
import type { Theme } from '#utils/theme/types';

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
  const { mode, effectiveColorScheme, setTheme, theme } = useTheme();

  const selectedColorScheme = new Set([
    mode === 'session' ? theme.colorScheme : 'system',
  ]);

  function onThemeSelect(key: Key) {
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
    <Dropdown showArrow placement="top-end">
      <DropdownTrigger>
        <Button
          className={twMerge(
            'overflow-clip ',
            mode === 'client' && 'opacity-70',
          )}
          isIconOnly
          variant="ghost"
          aria-label="Öffne Farbschema Menu"
        >
          <div className="relative size-5">
            <Icon
              name="moon"
              className={twMerge(
                'absolute inset-0 origin-[50%_100px] rotate-90 transform transition-transform duration-300',
                effectiveColorScheme === 'dark' && 'rotate-0',
              )}
            />
            <Icon
              name="sun"
              className={twMerge(
                '-rotate-90 absolute inset-0 origin-[50%_100px] transform transition-transform duration-300',
                effectiveColorScheme === 'light' && 'rotate-0',
              )}
            />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={selectedColorScheme}
        onAction={onThemeSelect}
        aria-label="Farbschema wählen"
        items={colorSchemes}
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
