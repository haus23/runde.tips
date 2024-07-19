import { type InferInput, object, picklist } from 'valibot';

const colorSchemeNames = ['light', 'dark'] as const;

export const colorSchemeSchema = picklist(colorSchemeNames);
export const themeColorSchema = picklist(['default']);

export const themeSchema = object({
  colorScheme: picklist([...colorSchemeNames, 'system']),
  themeColor: themeColorSchema,
});

export type Theme = InferInput<typeof themeSchema>;
export type ThemeMode = 'session' | 'client';
