import type { Championship } from '@prisma/client';
import { useParams } from '@remix-run/react';
import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { invariant } from '#utils/misc';
import { usePublishedChampionships } from './use-championships';

type ContextType = {
  championship: Championship | undefined;
  setChampionship: Dispatch<Championship>;
};

const ChampionshipContext = createContext<ContextType>(undefined as never);

export function ChampionshipProvider({ children }: { children: ReactNode }) {
  const publishedChampionships = usePublishedChampionships();
  const { championship: slug } = useParams();

  const currentChampionship = slug
    ? publishedChampionships.find((c) => c.slug === slug)
    : publishedChampionships[0];

  const [championship, setChampionship] = useState(currentChampionship);

  return (
    <ChampionshipContext.Provider value={{ championship, setChampionship }}>
      {children}
    </ChampionshipContext.Provider>
  );
}

export function useCurrentChampionship() {
  const ctx = useContext(ChampionshipContext);

  if (!ctx) {
    throw new Error('No ChampionshipProvider in component hierarchy.');
  }

  const { championship, setChampionship } = ctx;
  invariant(typeof championship !== 'undefined');

  return { championship, setChampionship };
}
