import type { Tip } from '@prisma/client';
import type { TipRuleId } from './rules';

type TipCalculationFn = (tip: Tip, result: string) => Promise<number>;

export const tipCalculators: RuleCalculators<TipRuleId, TipCalculationFn> = {
  'drei-oder-ein-punkt-joker-verdoppelt': async (tip, result) => 0,
  'drei-zwei-oder-ein-punkt-joker-verdoppelt': async (tip, result) => 0,
};
