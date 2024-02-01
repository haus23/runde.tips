import { useContext } from 'react';

import { ThemeContext } from './theme-context';
import { ThemeProvider } from './theme-provider';
import type { ColorScheme, ColorSchemeMode } from './types';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (typeof context === 'undefined') {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    mode: 'client',
    isSSR: !!context.clientHint,
    colorScheme: context.colorScheme,
  } satisfies {
    colorScheme?: ColorScheme;
    mode: ColorSchemeMode;
    isSSR: boolean;
  };
}

export { ThemeProvider };
export { getHints } from './client-hints';
export { MediaQueryFallback } from './media-query-fallback';
