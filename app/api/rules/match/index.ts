import type { Match, Tip } from '@prisma/client';
import type { TipRuleId } from '../tip';
import { matchCalculator } from './calculators';
import type { MatchRuleId } from './rules';

export * from './rules';

export async function calculateMatch(
  match: Match,
  originalTips: Array<Tip>,
  result: string,
  matchRule: MatchRuleId,
  tipRule: TipRuleId,
) {
  const { points, tips } = await matchCalculator[matchRule](
    match,
    originalTips,
    tipRule,
    result,
  );

  return { match: { ...match, result, points }, tips };
}
