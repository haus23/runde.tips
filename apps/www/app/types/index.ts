import { z } from 'zod';

const colorSchemeNames = ['light', 'dark'] as const;

// Types
export type ColorScheme = (typeof colorSchemeNames)[number];
export type ColorSchemeSource = 'client' | 'session';
export type Theme = { colorScheme: ColorScheme };
export type ClientHints = { colorScheme: ColorScheme | null };
export type ThemeSessionData = { theme: Theme };

// Validation Schemas
export const colorSchemeSchema = z.enum(colorSchemeNames);
export const themeSchema = z.object({
  colorScheme: colorSchemeSchema,
});
