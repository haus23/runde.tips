import type { Match, Tip } from '@prisma/client';
import { type TipRuleId, calculateTip } from '../tip';
import type { MatchRuleId } from './rules';

type MatchCalculationFn = (
  match: Match,
  tips: Tip[],
  tipRuleId: TipRuleId,
  resultString: string,
) => Promise<{ points: number; tips: Array<Tip> }>;

export const matchCalculator: RuleCalculators<MatchRuleId, MatchCalculationFn> =
  {
    'keine-besonderheiten': async (
      match,
      originalTips,
      tipRuleId,
      resultString,
    ) => {
      const tips = originalTips.map((t) =>
        calculateTip(t, resultString, tipRuleId),
      );
      const points = tips.reduce((sum, t) => sum + t.points, 0);

      return { points, tips };
    },
    'alleiniger-treffer-drei-punkte': async (
      match,
      originalTips,
      tipRuleId,
      resultString,
    ) => {
      const tips = originalTips.map((t) =>
        calculateTip(t, resultString, tipRuleId),
      );
      const points = tips.reduce((sum, t) => sum + t.points, 0);

      let lonelyHitTip: Tip | null = null;
      for (const tip of tips) {
        if (tip.points > 0 && lonelyHitTip !== null) {
          lonelyHitTip = tip;
        } else if (tip.points > 0) {
          lonelyHitTip = null;
          break;
        }
      }

      if (lonelyHitTip) lonelyHitTip.points += 3;

      return { points, tips };
    },
  };
