import { createCookieSessionStorage } from '@remix-run/node';

export const themeSession = createCookieSessionStorage({
  cookie: {
    name: '__theme',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.THEME_SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});
