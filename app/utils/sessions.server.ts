import { createCookie, createCookieSessionStorage } from 'react-router';
import { env } from './env.server';

type AuthSessionData = {
  sessionId: string;
};

type AuthSessionFlashData = {
  email: string;
  rememberMe: boolean;
};

export const authCookie = createCookie('__auth', {
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: [env.AUTH_SESSION_SECRET],
  secure: env.NODE_ENV === 'production',
});

const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  AuthSessionFlashData
>({
  cookie: authCookie,
});

const authSessionHelpers = {
  commitAuthSession: authSessionStorage.commitSession,
  destroyAuthSession: authSessionStorage.destroySession,
  getAuthSession: (request: Request) =>
    authSessionStorage.getSession(request.headers.get('Cookie')),
};

export const { getAuthSession, commitAuthSession, destroyAuthSession } = {
  ...authSessionHelpers,
};
