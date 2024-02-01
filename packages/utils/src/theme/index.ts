import { useContext } from 'react';

import { ThemeContext, ThemeProvider } from './theme-provider';
import type { ColorScheme, ColorSchemeMode } from './types';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (typeof context === 'undefined') {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    mode: 'client',
    colorScheme: context.clientHint,
  } satisfies { colorScheme: ColorScheme; mode: ColorSchemeMode };
}

export { ThemeProvider };
