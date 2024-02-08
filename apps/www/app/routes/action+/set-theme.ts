import { createThemeAction } from '@tipprunde/utils/theme';
import { themeSession } from '#app/utils/.server/sessions';

export const action = createThemeAction?.(themeSession);
