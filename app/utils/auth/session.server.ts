import { createCookie, createCookieSessionStorage } from '@remix-run/node';
import { db } from '#utils/db.server';

export const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 30;

export type AuthSessionData = {
  sessionId: string;
};

export const authCookie = createCookie('__auth', {
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: [process.env.SESSION_SECRET],
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

export async function ensureRollingAuthCookie(
  request: Request,
  responseHeaders: Headers,
) {
  // Is there an ongoing cookie set in the headers
  const cookieBeingSet = await authCookie.parse(
    responseHeaders.get('Set-Cookie'),
  );
  if (cookieBeingSet !== null) return;

  const session = await authSessionStorage.getSession(
    request.headers.get('Cookie'),
  );
  const sessionId = session.get('sessionId');
  if (!sessionId) return;

  const serverSession = await db.session.findUnique({
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });
  if (!serverSession || serverSession.expires) return;

  await db.session.update({
    where: { id: serverSession.id },
    data: {
      ...serverSession,
      updatedAt: new Date(),
      expirationDate: new Date(Date.now() + SESSION_EXPIRATION_TIME * 1000),
    },
  });

  responseHeaders.append(
    'Set-Cookie',
    await commitSession(session, { maxAge: SESSION_EXPIRATION_TIME }),
  );
}
