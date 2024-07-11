import { z } from 'zod';

const colorSchemeNames = ['light', 'dark'] as const;

export const colorSchemeSchema = z.enum(colorSchemeNames);
export const themeColorSchema = z.enum(['grass', 'violet']);

export const themeSchema = z.object({
  colorScheme: z.enum([...colorSchemeNames, 'system']),
  themeColor: themeColorSchema,
});

export type Theme = z.infer<typeof themeSchema>;
