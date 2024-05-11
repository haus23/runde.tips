import { z } from 'zod';

const tipRules = [
  'drei-oder-ein-punkt-joker-verdoppelt',
  'drei-zwei-oder-ein-punkt-joker-verdoppelt',
] as const;

const tipRuleSchema = z.enum(tipRules);

export type TipRuleId = z.infer<typeof tipRuleSchema>;

export const rulesetSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  extraQuestionRuleId: z.string(),
  matchRuleId: z.string(),
  roundRuleId: z.string(),
  tipRuleId: tipRuleSchema,
});
