import type { ColorScheme, ColorSchemeMode } from './types';

const defaultColorScheme: ColorScheme = 'light';

export function useTheme() {
  return {
    mode: 'client',
    colorScheme: defaultColorScheme,
  } satisfies { colorScheme: ColorScheme; mode: ColorSchemeMode };
}
