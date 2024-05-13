import type { Tip } from '@prisma/client';
import { tipCalculator } from './calculators';
import type { TipRuleId } from './rules';

export * from './rules';

export async function calculateTip(
  tip: Tip,
  result: string,
  tipRule: TipRuleId,
) {
  const points = tipCalculator[tipRule](tip, result);

  return { ...tip, points } satisfies Tip;
}
