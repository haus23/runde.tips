import { createCookieSessionStorage } from '@remix-run/node';
import { createSessionResolver } from '@tipprunde/utils/session';
import type { Theme } from '@tipprunde/utils/theme';

export const themeSessionResolver = createSessionResolver<{ theme: Theme }>(
  createCookieSessionStorage({
    cookie: {
      name: '__theme',
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [process.env.THEME_SESSION_SECRET],
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);
