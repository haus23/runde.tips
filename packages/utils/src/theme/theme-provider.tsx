import { useFetcher } from '@remix-run/react';
import {
  type ReactNode,
  createContext,
  useCallback,
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
  theme: Theme;
  mode: ColorSchemeSource;
  setColorScheme: (scheme: ColorScheme | 'system') => void;
  // setThemeColor: ...
};

const ThemeContext = createContext<ThemeContextType>(undefined as never);

const prefersLightQuery = '(prefers-color-scheme: light)';

function detectSSRColorScheme(sources: { theme?: Theme; hints?: ClientHints }) {
  return sources.theme?.colorScheme || sources.hints?.colorScheme || null;
}

type ThemeProviderProps = {
  theme?: Theme;
  hints?: ClientHints;
  themeAction?: string;
  mediaQueryFallback: boolean;
  children: ReactNode;
};

export function ThemeProvider({
  children,
  theme,
  hints,
  themeAction,
  mediaQueryFallback = false,
}: ThemeProviderProps) {
  const fetcher = useFetcher();

  const mode = theme?.colorScheme ? 'session' : 'client';
  const [colorScheme, setColorSchemeState] = useState<ColorScheme | null>(
    detectSSRColorScheme({ theme, hints }),
  );
  const setColorScheme = (scheme: ColorScheme | 'system') => {
    if (!themeAction) {
      throw new Error(
        'You must specify themeAction in ThemeProvider to switch themes.',
      );
    }
    fetcher.submit(
      { colorScheme: scheme },
      { method: 'POST', action: themeAction },
    );
  };

  useEffect(() => {
    setColorSchemeState(detectSSRColorScheme({ theme, hints }));
  }, [theme, hints]);

  useEffect(() => {
    // Listen only with mediaQueryFallback or Client-Hints Support
    if (mediaQueryFallback || !!hints?.colorScheme) {
      // Switch only on system theme
      const handleChange = (ev: MediaQueryListEvent) => {
        if (!theme?.colorScheme) {
          setColorSchemeState(ev.matches ? 'light' : 'dark');
        }
      };

      const mediaQuery = window.matchMedia(prefersLightQuery);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery?.removeEventListener('change', handleChange);
    }
  }, [theme, hints, mediaQueryFallback]);

  return (
    <ThemeContext.Provider
      value={{ theme: { colorScheme }, mode, setColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('You must use useTheme within a ThemeProvider.');
  }
  return ctx;
}
