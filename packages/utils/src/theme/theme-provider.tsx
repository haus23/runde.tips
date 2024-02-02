import { type ReactNode, createContext, useContext } from 'react';
import type {
  ClientHints,
  ColorScheme,
  ColorSchemeSource,
  Theme,
} from './types';

type ThemeContextType = {
  theme: Theme | undefined;
  hints: ClientHints;
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

export function useTheme(): {
  colorScheme: ColorScheme | null;
  mode: ColorSchemeSource;
} {
  const ctx = useContext(ThemeContext);

  return {
    colorScheme: ctx.theme?.colorScheme || ctx.hints.colorScheme,
    mode: ctx.theme ? 'session' : 'client',
  };
}
