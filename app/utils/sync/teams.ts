import { db } from '#utils/db.server';
import { getFirestoreTeams } from '../firestore/team';

export async function syncTeams() {
  const legacyTeams = await getFirestoreTeams();

  for (const team of legacyTeams) {
    await db.team.upsert({
      where: { slug: team.id },
      create: {
        name: team.name,
        slug: team.id,
        shortname: team.shortname,
      },
      update: {
        name: team.name,
        shortname: team.shortname,
      },
    });
  }
}
