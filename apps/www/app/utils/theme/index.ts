import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#root';

export function useTheme() {
  const data = useRouteLoaderData<typeof loader>('root');

  const effectiveColorScheme =
    data?.requestInfo.theme.hints.colorScheme ?? 'light';

  return { effectiveColorScheme };
}
