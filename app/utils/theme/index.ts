import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import type { loader } from '#root';

import { z } from 'zod';

const colorSchemeSchema = z.enum(['light', 'dark']);
export type ColorScheme = z.infer<typeof colorSchemeSchema>;

const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  const mode = data?.requestInfo.theme ? 'session' : 'client';
  const theme = {
    colorScheme:
      data?.requestInfo.theme?.colorScheme ??
      data?.requestInfo.hints.colorScheme ??
      'light',
  };

  const setTheme = useCallback(
    (theme: { colorScheme: ColorScheme | 'system' }) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { theme, mode, setTheme };
}
