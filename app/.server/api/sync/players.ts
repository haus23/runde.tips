import { db } from '#.server/db';
import { getFirestorePlayers } from '../firestore/player';

export async function syncPlayers() {
  const legacyPlayers = await getFirestorePlayers();

  for (const acc of legacyPlayers) {
    await db.user.upsert({
      where: { slug: acc.id },
      create: {
        name: acc.name,
        slug: acc.id,
        email: acc.email || null,
        role: acc.role || 'PLAYER',
      },
      update: {
        name: acc.name,
        email: acc.email || null,
        role: acc.role || 'PLAYER',
      },
    });
  }
}
