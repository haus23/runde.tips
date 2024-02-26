import { useContext } from 'react';
import { invariant } from '#utils/misc';
import { FohContext } from './foh-context';

export function useChampionship() {
  const { championship, championshipSegment, setChampionship } =
    useContext(FohContext);

  invariant(typeof championship !== 'undefined');

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
