import { firestore, modelConverter } from './firestore.server';

export type ChampionshipPlayer = {
  id: string;
  nr: number;
  rank: number;
  playerId: string;
  points: number;
  extraPoints: number;
  totalPoints: number;
  entityId: number; // MIGRATION: added prop used in sync code
};

export async function getLegacyChampionshipPlayers(championshipId: string) {
  const snapshot = await firestore
    .collection(`championships/${championshipId}/players`)
    .orderBy('nr', 'asc')
    .withConverter(modelConverter<ChampionshipPlayer>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
