import type { Championship } from '@prisma/client';
import { useNavigate, useParams } from '@remix-run/react';
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
  championships: Championship[];
  championship: Championship | undefined;
  setChampionship: Dispatch<Championship>;
};

const ChampionshipContext = createContext<ContextType>(undefined as never);

export function ChampionshipProvider({ children }: { children: ReactNode }) {
  const championships = usePublishedChampionships();
  const { championship: slug } = useParams();

  const currentChampionship = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];

  const [championship, setChampionship] = useState(currentChampionship);

  return (
    <ChampionshipContext.Provider
      value={{ championships, championship, setChampionship }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
}

export function useCurrentChampionship() {
  const publishedChampionships = usePublishedChampionships();
  const ctx = useContext(ChampionshipContext);
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error('No ChampionshipProvider in component hierarchy.');
  }

  const { championship, setChampionship } = ctx;

  function setChampionshipWithNavigation(championship: Championship) {
    setChampionship(championship);
    const championshipSegment =
      championship === publishedChampionships[0] ? '' : championship.slug;
    navigate(`/${championshipSegment}`);
  }

  return { championship, setChampionship: setChampionshipWithNavigation };
}
