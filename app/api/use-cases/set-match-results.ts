import { db } from '#utils/db.server';
import { invariant } from '#utils/misc.js';
import { calculateMatch, matchRuleSchema } from '../rules/match';
import { tipRuleSchema } from '../rules/tip';

export async function setMatchResults(
  results: { matchId: number; result: string }[],
) {
  const matches = await db.match.findMany({
    where: { id: { in: results.map((r) => r.matchId) } },
  });

  const championships = await db.championship.findMany({
    where: { id: { in: matches.map((m) => m.championshipId) } },
  });
  invariant(
    championships[0] && typeof championships[1] === 'undefined',
    'Zu berechnende Spiele müssen aus einem Turnier stammen',
  );
  const championship = championships[0];

  const ruleSet = await db.ruleset.findUniqueOrThrow({
    where: { id: championship.rulesetId },
  });
  const matchRule = matchRuleSchema.parse(ruleSet.matchRuleId);
  const tipRule = tipRuleSchema.parse(ruleSet.tipRuleId);

  for (const result of results) {
    const originalMatch = matches.find((m) => m.id === result.matchId);
    invariant(originalMatch);
    const originalTips = await db.tip.findMany({
      where: { matchId: originalMatch.id },
    });

    // Match berechnen
    const { match, tips } = await calculateMatch(
      originalMatch,
      originalTips,
      result.result,
      matchRule,
      tipRule,
    );

    await db.match.update({ data: match, where: { id: match.id } });
    await Promise.all(
      tips.map((tip) => db.tip.update({ data: tip, where: { id: tip.id } })),
    );
  }

  // Turnier neu berechnen
}
