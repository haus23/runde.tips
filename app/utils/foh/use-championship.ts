import { useContext } from 'react';
import { FohContext } from './foh-context';

export function useChampionship() {
  const { championship, championshipSegment, setChampionship } =
    useContext(FohContext);

  if (!championship) {
    throw new Response('Not Found', { status: 404 });
  }

  return {
    championship,
    championshipSegment,
    setChampionship,
  };
}

export function useOptionalChampionship() {
  const { championship, championshipSegment, setChampionship } =
    useContext(FohContext);

  return {
    championship,
    championshipSegment,
    setChampionship,
  };
}
