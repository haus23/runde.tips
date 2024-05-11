import { rulesetSchema } from '#api/model/ruleset.js';
import { Result } from '#api/types/result.js';
import { db } from '#utils/db.server';
import { calculateTip } from './tip';

export async function setMatchResult(result: {
  matchId: number;
  result: string;
}) {
  // Lookup match and associated data
  const match = await db.match.findFirstOrThrow({
    where: { id: result.matchId },
    include: { championship: true, round: true },
  });
  const ruleset = rulesetSchema.parse(
    await db.ruleset.findFirstOrThrow({
      where: { id: match.championship.rulesetId },
    }),
  );
  const tips = await db.tip.findMany({ where: { matchId: match.id } });

  // Calculate tips and reset all extra data
  for (const tip of tips) {
    const points = calculateTip(
      tip,
      Result.makeFrom(result.result),
      ruleset.tipRuleId,
    );
    tip.points = points;
    tip.lonelyHit = false;
  }
}
