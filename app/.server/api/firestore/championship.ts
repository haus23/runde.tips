import { firestore, modelConverter } from '#.server/firestore';

type Championship = {
  id: string;
  name: string;
  nr: number;
  rulesId: string;
  published: boolean;
  extraPointsPublished: boolean;
  completed: boolean;
  synced?: boolean; // MIGRATION: added optional prop used in sync code
};

export async function getFirestoreChampionships() {
  const snapshot = await firestore
    .collection('championships')
    .orderBy('nr', 'desc')
    .withConverter(modelConverter<Championship>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
