import { cached } from '#utils/cache.server';
import { db } from '#utils/db.server';

export function getPublishedChampionships() {
  return cached('publishedChampionships', () => {
    console.log('Fetching published championships');
    return db.championship.findMany({
      where: { published: true },
      orderBy: { nr: 'desc' },
    });
  });
}
