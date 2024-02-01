import type { ReactNode } from 'react';
import { createContext } from 'react';

import type { ColorScheme } from './types';

type ThemeContextType = {
  clientHint: ColorScheme | undefined;
};

type ThemeProviderProps = ThemeContextType & {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
  ...contextProps
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={contextProps}>
      {children}
    </ThemeContext.Provider>
  );
}
