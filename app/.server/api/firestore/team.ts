import { firestore, modelConverter } from '#.server/firestore';

type Team = {
  id: string;
  name: string;
  shortname: string;
};

export async function getFirestoreTeams() {
  const snapshot = await firestore
    .collection('teams')
    .withConverter(modelConverter<Team>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
