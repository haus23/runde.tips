import { z } from 'zod';

export const createChampionshipSchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z]{2}\d{4}$/),
  nr: z.number().int(),
  rulesetId: z.number(),
});

export type CreateChampionshipCommand = {
  name: 'CREATE_CHAMPIONSHIP';
  payload: z.infer<typeof createChampionshipSchema>;
};

export type APICommand = CreateChampionshipCommand;
