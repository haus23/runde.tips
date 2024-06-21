import { firestore, modelConverter } from '../firestore.server';

type Tip = {
  id: string;
  tip: string;
  joker: boolean;
  extraJoker?: boolean;
  points: number;
  lonelyHit?: boolean;
  matchId: string;
  playerId: string;
};

export async function getLegacyTips(championshipId: string) {
  const snapshot = await firestore
    .collection(`championships/${championshipId}/tips`)
    .withConverter(modelConverter<Tip>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
