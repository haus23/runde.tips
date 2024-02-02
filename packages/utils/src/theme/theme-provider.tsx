import { type ReactNode, createContext, useContext } from 'react';
import type { Theme } from './types';

type ThemeContextType = {
  theme: Theme | undefined;
};

const ThemeContext = createContext<ThemeContextType>(undefined as never);

type ThemeProviderProps = ThemeContextType & {
  children: ReactNode;
};

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

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx;
}
