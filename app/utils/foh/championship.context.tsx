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
  currentChampionship: Championship | undefined;
  setCurrentChampionship: Dispatch<Championship>;
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
      value={{
        championships,
        currentChampionship: championship,
        setCurrentChampionship: setChampionship,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
}

export function useChampionship() {
  const ctx = useContext(ChampionshipContext);
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error('No ChampionshipProvider in component hierarchy.');
  }

  function setCurrentChampionship(championship: Championship) {
    ctx.setCurrentChampionship(championship);
    const championshipSegment =
      championship === ctx.championships[0] ? '' : championship.slug;
    navigate(`/${championshipSegment}`);
  }

  return {
    ...ctx,
    setCurrentChampionship,
  };
}
