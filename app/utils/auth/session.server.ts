import { createCookieSessionStorage } from '@remix-run/node';

export type AuthSessionData = {
  sessionId: string;
  expires: Date;
};

export const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  { email: string; errors: Record<string, string> }
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

const originalCommitSession = authSessionStorage.commitSession;

Object.defineProperty(authSessionStorage, 'commitSession', {
  value: async function commitSession(
    ...args: Parameters<typeof originalCommitSession>
  ) {
    const [session, options] = args;
    if (options?.expires) {
      session.set('expires', options.expires);
    }
    if (options?.maxAge) {
      session.set('expires', new Date(Date.now() + options.maxAge * 1000));
    }
    const sessionExpiresDate = session.get('expires');
    const expires = sessionExpiresDate
      ? new Date(sessionExpiresDate)
      : undefined;
    const setCookieHeader = await originalCommitSession(session, {
      ...options,
      expires,
    });
    console.log(expires);
    return setCookieHeader;
  },
});

export const { commitSession, destroySession, getSession } = {
  ...authSessionStorage,
  getSession: (request: Request) =>
    authSessionStorage.getSession(request.headers.get('Cookie')),
};
