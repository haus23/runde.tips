import type { Championship } from '@prisma/client';
import { useParams } from '@remix-run/react';
import { type ReactNode, createContext, useCallback, useState } from 'react';
import { usePublishedChampionships } from './use-championships';

type FohContextProps = {
  championship?: Championship;
  championshipSegment: string;
  setChampionship: (championship?: Championship) => void;
};

export const FohContext = createContext<FohContextProps>(undefined as never);

export function FohProvider({ children }: { children: ReactNode }) {
  const championships = usePublishedChampionships();
  const latestChampionship = championships[0];

  const { championship: slug } = useParams();

  const [currentChampionshipState, setCurrentChampionshipState] = useState(
    () => {
      const championship = slug
        ? championships.find((c) => c.slug === slug)
        : latestChampionship;
      return {
        championship,
        championshipSegment:
          championship?.id === latestChampionship?.id
            ? ''
            : championship?.slug || '',
      };
    },
  );

  const setChampionship = useCallback(
    (championship?: Championship) => {
      if (!championship) return;

      setCurrentChampionshipState({
        championship,
        championshipSegment:
          championship.id === latestChampionship?.id ? '' : championship.slug,
      });
    },
    [latestChampionship?.id],
  );

  return (
    <FohContext.Provider
      value={{ ...currentChampionshipState, setChampionship }}
    >
      {children}
    </FohContext.Provider>
  );
}
