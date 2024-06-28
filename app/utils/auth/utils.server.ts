import type { User } from '@prisma/client';
import { redirect } from '@remix-run/node';
import { db } from '#utils/db.server.ts';
import { redirectWithToast } from '#utils/toast/toast.server.ts';
import { logout } from './auth.server';
import { getSession } from './session.server';

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
