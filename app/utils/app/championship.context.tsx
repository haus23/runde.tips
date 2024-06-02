import type { Championship } from '@prisma/client';
import { useParams } from '@remix-run/react';
import { type Dispatch, type ReactNode, createContext, useState } from 'react';

type ContextType = {
  championships: Championship[];
  currentChampionship: Championship | undefined;
  setCurrentChampionship: Dispatch<Championship>;
};

export const ChampionshipContext = createContext<ContextType>(
  undefined as never,
);

export function ChampionshipProvider({
  championships,
  children,
}: { championships: Championship[]; children: ReactNode }) {
  const { championship: slug } = useParams();

  const [currentChampionship, setCurrentChampionship] = useState(
    slug ? championships.find((c) => c.slug === slug) : championships[0],
  );

  return (
    <ChampionshipContext.Provider
      value={{
        championships,
        currentChampionship,
        setCurrentChampionship,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
}
