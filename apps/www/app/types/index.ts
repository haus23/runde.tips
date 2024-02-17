import { z } from 'zod';

const colorSchemeNames = ['light', 'dark'] as const;

// ***** Types

// Theme
export type ColorScheme = (typeof colorSchemeNames)[number];
export type ColorSchemeSource = 'client' | 'session';
export type Theme = { colorScheme: ColorScheme };
export type ClientHints = { colorScheme: ColorScheme | null };
export type ThemeSessionData = { theme: Theme };

// Toast
export type ToastMessage = {
  type: 'success' | 'info';
  msg: string;
};

// ***** Validation Schemas

// Theme
export const colorSchemeSchema = z.enum(colorSchemeNames);
export const themeSchema = z.object({
  colorScheme: colorSchemeSchema,
});
