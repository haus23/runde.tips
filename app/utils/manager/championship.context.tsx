import type { Championship } from '@prisma/client';
import { useParams } from '@remix-run/react';
import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { useChampionships } from './use-championships';

type ContextType = {
  championship: Championship | undefined;
  setChampionship: Dispatch<Championship>;
};

const ChampionshipContext = createContext<ContextType>(undefined as never);

export function ChampionshipProvider({ children }: { children: ReactNode }) {
  const championships = useChampionships();
  const { championship: slug } = useParams();

  const currentChampionship = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];

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

  return ctx;
}
