import { createCookieSessionStorage } from '@remix-run/node';

export type AuthSessionData = {
  sessionId: string;
  expires: Date;
};

export const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  { email: string; errors: Record<string, string>; rememberMe: boolean }
>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { commitSession, destroySession, getSession } = {
  ...authSessionStorage,
  getSession: (request: Request) =>
    authSessionStorage.getSession(request.headers.get('Cookie')),
};
