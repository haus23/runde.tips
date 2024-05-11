import type { Tip } from '@prisma/client';
import type { TipRuleId } from '#api/model/ruleset';
import { Result } from '#api/types/result';

export function calculateTip(tip: Tip, result: Result, tipRule: TipRuleId) {
  const tipResult = Result.makeFrom(tip.tip);
  if (tipResult.isEmpty || result.isEmpty) return 0;

  // Wrong toto tendence?
  if (tipResult.totoTendence !== result.totoTendence) return 0;

  let points = 1;

  // More than one point?
  if (tipResult.goalDiff === result.goalDiff) {
    if (tipResult.homeGoals === result.homeGoals) {
      points = 3;
    }
  } else if (tipRule === 'drei-zwei-oder-ein-punkt-joker-verdoppelt') {
    points = 2;
  }

  // Joker
  if (tip.joker) points *= 2;

  return points;
}
