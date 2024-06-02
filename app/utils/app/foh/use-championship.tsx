import type { Championship } from '@prisma/client';
import { useNavigate } from '@remix-run/react';
import { useContext } from 'react';
import { ChampionshipContext } from '#utils/app/championship.context';

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
