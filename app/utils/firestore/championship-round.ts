import { firestore, modelConverter } from './firestore.server';

type Round = {
  id: string;
  nr: number;
  published: boolean;
  tipsPublished: boolean;
  isDoubleRound?: boolean;
  completed: boolean;
  entityId: number; // MIGRATION: added prop used in sync code
};

export async function getLegacyRounds(championshipId: string) {
  const snapshot = await firestore
    .collection(`championships/${championshipId}/rounds`)
    .orderBy('nr', 'asc')
    .withConverter(modelConverter<Round>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
