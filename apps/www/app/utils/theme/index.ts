import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import { safeParse } from 'valibot';

import type { loader } from '#root';
import { type Theme, type ThemeMode, colorSchemeSchema } from './types';

export { ClientHintsFallback } from './client-hints-fallback';
export { cookieName } from './types';

export const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  // True only if cookie and colorScheme is light or dark
  const hasPersistedColorScheme = safeParse(
    colorSchemeSchema,
    data?.requestInfo.theme.session?.colorScheme,
  ).success;

  const needsFallback = !!data?.requestInfo.theme.hints.fallback;
  const mode = (
    hasPersistedColorScheme ? 'session' : 'client'
  ) satisfies ThemeMode;

  const effectiveColorScheme =
    (hasPersistedColorScheme
      ? data?.requestInfo.theme.session?.colorScheme
      : undefined) ??
    data?.requestInfo.theme.hints.colorScheme ??
    'light';

  const theme = {
    colorScheme: data?.requestInfo.theme.session?.colorScheme || 'system',
    themeColor: 'default', // The only implemented themeColor
  } satisfies Theme;

  const setTheme = useCallback(
    (theme: Theme) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { effectiveColorScheme, mode, needsFallback, setTheme, theme };
}
