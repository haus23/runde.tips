import * as v from 'valibot';

export const ThemeSchema = v.object({
  colorScheme: v.picklist(['system', 'light', 'dark']),
});
export type Theme = v.Input<typeof ThemeSchema>;
