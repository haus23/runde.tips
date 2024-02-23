import { db } from '#.server/db';
import type { ToastMessage } from '#types';
import { getFirestoreChampionshipById } from '../firestore/championship';

export async function syncChampionship(slug: string): Promise<ToastMessage> {
  // Look for championship in local data
  const championship = await db.championship.findUnique({ where: { slug } });

  // Nothing todo if already complete
  if (championship?.completed) {
    return {
      type: 'info',
      msg: 'Turnier war schon abgeschlossen und aktuell.',
    };
  }

  // Load legacy championship
  const legacyChampionship = await getFirestoreChampionshipById(slug);

  // Three ways to syncronize:
  // 1. Remote complete, local undefined -> Simple insert
  // 2. Remote uncomplete, local undefined -> Simple insert with preparing sync helper data
  // 3. Remote uncomplete, local defined -> Sync with helper data
  // 4. Remote complete, local defined -> Last sync with helper data and delete helper data

  const result = {
    type: 'error',
    msg: 'Diese Art des Abgleichs ist noch nicht implementiert',
  } satisfies ToastMessage;

  if (championship === null) {
    if (legacyChampionship.completed) {
    } else {
    }
  } else {
    if (!legacyChampionship.completed) {
    } else {
    }
  }

  return result;
}
