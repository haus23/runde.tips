import { useFetcher } from '@remix-run/react';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { z } from 'zod';

const colorSchemeNames = ['light', 'dark'] as const;

// Types
export type ColorScheme = (typeof colorSchemeNames)[number];
export type ColorSchemeSource = 'client' | 'session';
export type Theme = { colorScheme: ColorScheme };
export type ClientHints = {
  colorScheme: ColorScheme | null;
  fallback?: boolean;
};
export type ThemeSessionData = { theme: Theme };

// Validation Schema
export const colorSchemeSchema = z.enum(colorSchemeNames);
export const themeSchema = z.object({
  colorScheme: colorSchemeSchema,
});

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: { colorScheme: ColorScheme | 'system' }) => void;
  mode: ColorSchemeSource;
  mediaQueryFallback?: boolean;
  isSSR: boolean;
};

const ThemeContext = createContext<ThemeContextType>(undefined as never);

const prefersLightQuery = '(prefers-color-scheme: light)';

function detectSSRColorScheme(sources: { theme?: Theme; hints?: ClientHints }) {
  return sources.theme?.colorScheme || sources.hints?.colorScheme || null;
}

type ThemeProviderProps = {
  sessionTheme?: Theme;
  hints?: ClientHints;
  themeAction?: string;
  children: ReactNode;
} & (
  | {
      mediaQueryFallback: true;
      defaultColorScheme?: never;
    }
  | {
      mediaQueryFallback?: never;
      defaultColorScheme: ColorScheme;
    }
);

export function ThemeProvider({
  children,
  sessionTheme,
  hints,
  themeAction,
  mediaQueryFallback,
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

    return { colorScheme: scheme || defaultColorScheme || 'light' };
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
    setThemeState((t) => ({
      ...t,
      colorScheme: scheme || defaultColorScheme || 'light',
    }));
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

export function useThemeLegacy() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('You must use useTheme within a ThemeProvider.');
  }
  return ctx;
}
