import { useParams } from '@remix-run/react';
import { fakeChampionshipsFlag } from './mock';

export function useChampionship() {
  // Faking the hook...
  const { championship: slug } = useParams();

  const championships = fakeChampionshipsFlag
    ? [
        { id: 2, slug: 'hr2425' },
        { id: 1, slug: 'em2024' },
      ]
    : [];
  const currentChampionship = slug
    ? championships.find((c) => c.slug === slug)
    : championships[0];

  return {
    championships,
    currentChampionship,
  };
}
