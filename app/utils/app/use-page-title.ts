import { useMatches } from '@remix-run/react';
import { useContext } from 'react';
import { ChampionshipContext } from './championship.context';

type RouteHandle = {
  pageTitle: string;
};

function hasPageTitle(handle: unknown): handle is RouteHandle {
  return typeof handle === 'object' && handle !== null && 'pageTitle' in handle;
}

export function usePageTitle() {
  const matches = useMatches();
  const { currentChampionship } = useContext(ChampionshipContext);

  const handle = matches.at(-1)?.handle;

  if (hasPageTitle(handle)) {
    return handle.pageTitle;
  }

  return currentChampionship?.name || '';
}
