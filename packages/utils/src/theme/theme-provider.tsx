import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { ThemeContext } from './theme-context';
import type { ColorScheme } from './types';

type ThemeProviderProps = {
  children: ReactNode;
  clientHint: ColorScheme | undefined;
};

const prefersLightQuery = '(prefers-color-scheme: light)';

export function ThemeProvider({ children, clientHint }: ThemeProviderProps) {
  const [colorScheme, setTheme] = useState<ColorScheme | undefined>(() => {
    if (clientHint) {
      return clientHint;
    }

    if (typeof window !== 'object') {
      return undefined;
    }

    return window.matchMedia(prefersLightQuery).matches ? 'light' : 'dark';
  });

  useEffect(() => {
    const handleChange = (ev: MediaQueryListEvent) => {
      setTheme(ev.matches ? 'light' : 'dark');
    };
    const mediaQuery = window.matchMedia(prefersLightQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery?.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ clientHint, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
