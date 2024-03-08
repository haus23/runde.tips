import { z } from 'zod';

export const colorSchemeSchema = z.enum(['light', 'dark']);
export type ColorScheme = z.infer<typeof colorSchemeSchema>;
