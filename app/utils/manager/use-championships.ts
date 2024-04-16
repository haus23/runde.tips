import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '#routes/manager+/_layout/_layout';
import { invariant } from '#utils/misc';

export function useChampionships() {
  const data = useRouteLoaderData<typeof loader>(
    'routes/manager+/_layout/_layout',
  );
  invariant(typeof data !== 'undefined');

  return data.championships;
}
