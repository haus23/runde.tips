import { firestore, modelConverter } from '#.server/firestore';

type League = {
  id: string;
  name: string;
  shortname: string;
};

export async function getFirestoreLeagues() {
  const snapshot = await firestore
    .collection('leagues')
    .withConverter(modelConverter<League>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
