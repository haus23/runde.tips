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
  theme: Theme;
  setTheme: (theme: { colorScheme: ColorScheme | 'system' }) => void;
  mode: ColorSchemeSource;
  mediaQueryFallback: boolean;
  isSSR: boolean;
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
  mediaQueryFallback?: boolean;
  defaultColorScheme: ColorScheme;
  children: ReactNode;
};

export function ThemeProvider({
  children,
  theme: sessionTheme,
  hints,
  themeAction,
  mediaQueryFallback = false,
  defaultColorScheme,
}: ThemeProviderProps) {
  const fetcher = useFetcher();

  const mode = sessionTheme?.colorScheme ? 'session' : 'client';
  const isSSR = !!(sessionTheme?.colorScheme || hints?.colorScheme);

  const [theme, setThemeState] = useState<Theme>(() => {
    let scheme = detectSSRColorScheme({ theme: sessionTheme, hints });

    if (!scheme && mediaQueryFallback && typeof window !== 'undefined') {
      scheme = window.matchMedia(prefersLightQuery).matches ? 'light' : 'dark';
    }

    return { colorScheme: scheme || defaultColorScheme };
  });

  const setTheme = (theme: { colorScheme: ColorScheme | 'system' }) => {
    if (!themeAction) {
      throw new Error(
        'You must specify themeAction in ThemeProvider to switch themes.',
      );
    }
    fetcher.submit(theme, { method: 'POST', action: themeAction });
  };

  useEffect(() => {
    let scheme = detectSSRColorScheme({ theme: sessionTheme, hints });

    if (!scheme && mediaQueryFallback && typeof window !== 'undefined') {
      scheme = window.matchMedia(prefersLightQuery).matches ? 'light' : 'dark';
    }
    setThemeState((t) => ({ ...t, colorScheme: scheme || defaultColorScheme }));
  }, [sessionTheme, hints, mediaQueryFallback, defaultColorScheme]);

  useEffect(() => {
    // Listen only with mediaQueryFallback or Client-Hints Support
    if (mediaQueryFallback || !!hints?.colorScheme) {
      // Switch only on system theme
      const handleChange = (ev: MediaQueryListEvent) => {
        if (!sessionTheme?.colorScheme) {
          setThemeState((t) => ({
            ...t,
            colorScheme: ev.matches ? 'light' : 'dark',
          }));
        }
      };

      const mediaQuery = window.matchMedia(prefersLightQuery);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery?.removeEventListener('change', handleChange);
    }
  }, [sessionTheme, hints, mediaQueryFallback]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setTheme,
        mediaQueryFallback,
        isSSR,
      }}
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
