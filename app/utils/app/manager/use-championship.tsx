import type { Championship } from '@prisma/client';
import { useLocation, useNavigate } from '@remix-run/react';
import { useContext } from 'react';
import { ChampionshipContext } from '#utils/app/championship.context';

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
