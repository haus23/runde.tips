import * as v from 'valibot';

const colorSchemeNames = ['light', 'dark'] as const;
export const ColorSchemeSchema = v.picklist(colorSchemeNames);

export const ThemeSchema = v.object({
  colorScheme: v.nullable(ColorSchemeSchema),
  // themeColor: ...
});
export const ClientHintsSchema = v.object({
  colorScheme: v.nullable(ColorSchemeSchema),
});

export type ColorSchemeSource = 'client' | 'session';
export type ColorScheme = v.Input<typeof ColorSchemeSchema>;
export type Theme = v.Input<typeof ThemeSchema>;
export type ClientHints = v.Input<typeof ClientHintsSchema>;
