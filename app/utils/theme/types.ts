import * as v from 'valibot';

const colorSchemeNames = ['light', 'dark'] as const;

export const colorSchemeSchema = v.picklist(colorSchemeNames);
export const themeColorSchema = v.picklist(['default']);

export const themeSchema = v.object({
  colorScheme: v.picklist([...colorSchemeNames, 'system']),
  themeColor: themeColorSchema,
});

export type Theme = v.InferInput<typeof themeSchema>;
export type ThemeMode = 'session' | 'client';

export const cookieName = 'CH-prefers-color-scheme';
