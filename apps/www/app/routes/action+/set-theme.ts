import { createThemeAction } from '@tipprunde/utils/theme';
import { themeSessionResolver } from '#utils/sessions.server';

export const action = createThemeAction(themeSessionResolver);
