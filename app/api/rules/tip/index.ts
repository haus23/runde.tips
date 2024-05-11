import type { Tip } from '@prisma/client';
import { tipCalculators } from './calculators';
import type { TipRuleId } from './rules';

export * from './rules';

export async function calculateTips(
  tip: Tip,
  result: string,
  tipRule: TipRuleId,
) {
  const points = await tipCalculators[tipRule](tip, result);

  // (Re-) set all tip only related data
  return { ...tip, points, lonelyHit: false } satisfies Tip;
}
