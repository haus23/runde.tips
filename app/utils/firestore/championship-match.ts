import { firestore, modelConverter } from './firestore.server';

type Match = {
  id: string;
  nr: number;
  date: string;
  result: string;
  points: number;
  roundId: string;
  leagueId: string;
  hometeamId: string;
  awayteamId: string;
  entityId: number; // MIGRATION: added prop used in sync code
};

export async function getLegacyMatches(championshipId: string) {
  const snapshot = await firestore
    .collection(`championships/${championshipId}/matches`)
    .orderBy('nr', 'asc')
    .withConverter(modelConverter<Match>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
