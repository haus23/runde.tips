import { createCookieSessionStorage } from '@remix-run/node';
import type { AuthSessionData } from '@tipprunde/utils/auth';
import { cookieSession } from '@tipprunde/utils/session';
import type { ThemeSessionData } from '@tipprunde/utils/theme';

export const themeSession = cookieSession(
  createCookieSessionStorage<ThemeSessionData>({
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

export const authSession = cookieSession<AuthSessionData>(
  createCookieSessionStorage({
    cookie: {
      name: '__auth',
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [process.env.AUTH_SESSION_SECRET],
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);
