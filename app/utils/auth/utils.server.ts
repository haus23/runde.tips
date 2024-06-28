import type { User } from '@prisma/client';
import { redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';
import { db } from '#utils/db.server.js';
import { redirectWithToast } from '#utils/toast/toast.server.js';
import { destroySession, getSession } from './session.server';

/**
 * Logs user out. If no redirectFallback is set, it returns the destroy session cookie
 * header. With redirectFallback it redirects to the referer or the fallback route
 * and destroys the session cookie itself.
 *
 * @param request Request object
 * @param redirectFallback Fallback URL if no referer in request
 * @returns destroy session cookie header
 */
export async function logout(request: Request, redirectFallback?: string) {
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (sessionId) {
    await db.session.deleteMany({ where: { id: sessionId } });
  }

  const headers = new Headers({
    'Set-Cookie': await destroySession(authSession),
  });

  if (redirectFallback) {
    throw redirectBack(request, { fallback: redirectFallback, headers });
  }

  return headers;
}

export async function getUser(request: Request) {
  let user: User | null = null;
  let headers: Headers | null = null;

  // Authenticate
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (sessionId) {
    const session = await db.session.findFirst({
      where: { id: sessionId },
    });

    // Existing server session and not expired?
    if (session && new Date() < session.expirationDate) {
      user = await db.user.findFirst({ where: { id: session.userId } });
    }

    if (!user) {
      headers = await logout(request);
    }
  }

  return {
    user,
    headers,
  };
}

async function getOptionalUser(request: Request) {
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    select: { user: true },
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });

  return session?.user || null;
}

export async function requireAnonymous(request: Request) {
  const user = await getOptionalUser(request);
  if (user) {
    throw await redirectWithToast('/', {
      type: 'info',
      text: 'Du bist schon eingeloggt!',
    });
  }
}

export async function requireAdmin(request: Request) {
  const user = await getOptionalUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/login');
  }
}
