import { z } from 'zod';

const colorSchemeNames = ['light', 'dark'] as const;

// Types
type ColorScheme = (typeof colorSchemeNames)[number];
type Theme = { colorScheme: ColorScheme };
export type ThemeSessionData = { theme: Theme };

// Validation Schemas
export const themeSchema = z.object({
  colorScheme: z.enum(colorSchemeNames),
});
