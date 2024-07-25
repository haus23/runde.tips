import { createCookie, createCookieSessionStorage } from '@remix-run/node';

export const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 30;

export type AuthSessionData = {
  sessionId: string;
};

export const authCookie = createCookie('__auth', {
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: [process.env.AUTH_SESSION_SECRET],
  secure: process.env.NODE_ENV === 'production',
});

export const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  { email: string; errors: Record<string, string>; rememberMe: boolean }
>({
  cookie: authCookie,
});

export const { commitSession, destroySession, getSession } = {
  ...authSessionStorage,
  getSession: (request: Request) =>
    authSessionStorage.getSession(request.headers.get('Cookie')),
};
