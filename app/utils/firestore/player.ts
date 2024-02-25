import { firestore, modelConverter } from './firestore.server';

type Player = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export async function getFirestorePlayers() {
  const snapshot = await firestore
    .collection('players')
    .withConverter(modelConverter<Player>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
