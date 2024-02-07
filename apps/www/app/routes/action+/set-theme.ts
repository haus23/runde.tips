import { createThemeAction } from '@tipprunde/utils/theme';
import { themeSession } from '#utils/sessions.server';

export const action = createThemeAction?.(themeSession);
