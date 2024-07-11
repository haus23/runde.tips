import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import type { loader } from '#root';

import { type Theme, colorSchemeSchema } from './types';

type ThemeMode = 'session' | 'client';
const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  // Determines if either no cookie or cookie with 'system' colorScheme
  const hasPersistedColorScheme = colorSchemeSchema.safeParse(
    data?.requestInfo.theme?.colorScheme,
  ).success;

  const mode: ThemeMode = hasPersistedColorScheme ? 'session' : 'client';
  const needsFallback = !!data?.requestInfo.hints.fallback;

  const effectiveColorScheme =
    (hasPersistedColorScheme
      ? data?.requestInfo.theme?.colorScheme
      : undefined) ??
    data?.requestInfo.hints.colorScheme ??
    'light';

  const theme = {
    colorScheme: data?.requestInfo.theme?.colorScheme || 'system',
    themeColor: 'grass' as const, // The only implemented themeColor
  };

  const setTheme = useCallback(
    (theme: Theme) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { effectiveColorScheme, theme, mode, needsFallback, setTheme };
}
