import { db } from '#.server/db';
import { getFirestoreLeagues } from '../firestore/league';

export async function syncLeagues() {
  const legacyLeagues = await getFirestoreLeagues();

  for (const league of legacyLeagues) {
    await db.league.upsert({
      where: { slug: league.id },
      create: {
        name: league.name,
        slug: league.id,
        shortname: league.shortname,
      },
      update: {
        name: league.name,
        shortname: league.shortname,
      },
    });
  }
}
