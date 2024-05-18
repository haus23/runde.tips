import type { Championship } from '@prisma/client';
import {
  useLocation,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from '@remix-run/react';
import {
  type Dispatch,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import type { loader } from '#routes/manager+/_layout/_layout';
import { invariant } from '#utils/misc';

type ContextType = {
  championships: Championship[];
  currentChampionship: Championship | undefined;
  setCurrentChampionship: Dispatch<Championship>;
};

const ChampionshipContext = createContext<ContextType>(undefined as never);

export function ChampionshipProvider({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>(
    'routes/manager+/_layout/_layout',
  );
  invariant(typeof data !== 'undefined');

  const { championships } = data;
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

export function useChampionship() {
  const ctx = useContext(ChampionshipContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error('No ChampionshipProvider in component hierarchy.');
  }

  function setCurrentChampionship(championship: Championship) {
    const currentChampionship = ctx.currentChampionship;
    ctx.setCurrentChampionship(championship);
    if (
      currentChampionship &&
      location.pathname.includes(currentChampionship?.slug)
    ) {
      navigate({
        ...location,
        pathname: location.pathname.replace(
          currentChampionship.slug,
          championship.slug,
        ),
      });
    }
  }

  return { ...ctx, setCurrentChampionship };
}
