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

function detectSSRTheme(ctx: ThemeContextType) {
  return ctx.theme?.colorScheme || ctx.hints.colorScheme;
}

export function useTheme(): {
  colorScheme: ColorScheme | null;
  setColorScheme: (scheme: ColorScheme | 'system') => void;
  mode: ColorSchemeSource;
} {
  const { theme, hints } = useContext(ThemeContext);
  const fetcher = useFetcher();

  const [colorScheme, setColorSchemeState] = useState<ColorScheme | null>(() =>
    detectSSRTheme({ theme, hints }),
  );

  useEffect(() => {
    setColorSchemeState(detectSSRTheme({ theme, hints }));
  }, [theme, hints]);

  function setColorScheme(scheme: ColorScheme | 'system') {
    fetcher.submit(
      { colorScheme: scheme },
      { method: 'POST', action: '/action/set-theme' },
    );
  }

  return {
    colorScheme,
    setColorScheme,
    mode: theme ? 'session' : 'client',
  };
}
