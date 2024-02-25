import { db } from '#utils/db.server';
import { getFirestoreRulesets } from '../firestore/ruleset';

export async function syncRulesets() {
  const legacyRulesets = await getFirestoreRulesets();

  for (const ruleset of legacyRulesets) {
    await db.ruleset.upsert({
      where: { slug: ruleset.id },
      create: {
        name: ruleset.name,
        slug: ruleset.id,
        description: ruleset.description,
        extraQuestionRuleId: ruleset.extraQuestionRuleId,
        matchRuleId: ruleset.matchRuleId,
        roundRuleId: ruleset.roundRuleId,
        tipRuleId: ruleset.tipRuleId,
      },
      update: {},
    });
  }
}
