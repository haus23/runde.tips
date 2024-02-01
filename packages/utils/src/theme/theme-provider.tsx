import type { ReactNode } from 'react';
import { useState } from 'react';

import { ThemeContext } from './theme-context';
import type { ColorScheme } from './types';

type ThemeProviderProps = {
  children: ReactNode;
  clientHint: ColorScheme | undefined;
};

export function ThemeProvider({ children, clientHint }: ThemeProviderProps) {
  const [colorScheme] = useState<ColorScheme | undefined>(() => {
    if (clientHint) {
      return clientHint;
    }

    if (typeof window !== 'object') {
      return undefined;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  return (
    <ThemeContext.Provider value={{ clientHint, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
