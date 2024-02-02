import { useFetcher } from '@remix-run/react';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type {
  ClientHints,
  ColorScheme,
  ColorSchemeSource,
  Theme,
} from './types';

type ThemeContextType = {
  theme?: Theme;
  hints?: ClientHints;
  themeAction?: string;
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

function detectSSRTheme(ctx: ThemeContextType) {
  return ctx.theme?.colorScheme || ctx.hints?.colorScheme || null;
}

export function useTheme(): {
  colorScheme: ColorScheme | null;
  setColorScheme: (scheme: ColorScheme | 'system') => void;
  mode: ColorSchemeSource;
} {
  const fetcher = useFetcher();
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('You must use useTheme within a ThemeProvider.');
  }

  const { theme, hints, themeAction } = ctx;

  const [colorScheme, setColorSchemeState] = useState<ColorScheme | null>(() =>
    detectSSRTheme({ theme, hints }),
  );

  useEffect(() => {
    setColorSchemeState(detectSSRTheme({ theme, hints }));
  }, [theme, hints]);

  function setColorScheme(scheme: ColorScheme | 'system') {
    if (!themeAction) {
      throw new Error(
        'You must specify themeAction in ThemeProvider to switch themes.',
      );
    }
    fetcher.submit(
      { colorScheme: scheme },
      { method: 'POST', action: themeAction },
    );
  }

  return {
    colorScheme,
    setColorScheme,
    mode: theme ? 'session' : 'client',
  };
}
