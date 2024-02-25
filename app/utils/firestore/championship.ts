import { firestore, modelConverter } from './firestore.server';

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

export async function getFirestoreChampionshipById(id: string) {
  const docRef = firestore
    .collection('championships')
    .doc(id)
    .withConverter(modelConverter<Championship>());
  const doc = await docRef.get();
  const championship = doc.data();
  if (!championship) {
    throw new Error(`Unknown championship ${id}`);
  }
  return championship;
}
