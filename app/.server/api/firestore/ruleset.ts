import { firestore, modelConverter } from '#.server/firestore';

type Ruleset = {
  id: string;
  name: string;
  description: string;
  extraQuestionRuleId: string;
  matchRuleId: string;
  roundRuleId: string;
  tipRuleId: string;
};

export async function getFirestoreRulesets() {
  const snapshot = await firestore
    .collection('rules')
    .withConverter(modelConverter<Ruleset>())
    .get();
  return snapshot.docs.map((doc) => doc.data());
}
