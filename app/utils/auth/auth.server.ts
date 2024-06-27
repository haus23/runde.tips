import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { type SendTOTPOptions, TOTPStrategy } from 'remix-auth-totp';

import type { User } from '@prisma/client';
import { db } from '#utils/db.server';
import { sendTotpWithPostmark, sendTotpWithResend } from '#utils/email.server';
import { invariant } from '#utils/misc';

type AuthSessionData = {
  sessionId: number;
};

const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  { email: string }
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

export const authenticator = new Authenticator<AuthSessionData>(
  authSessionStorage,
);

export async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}

// TODO: refactor from here

export async function getUserByEmail(email: string) {
  invariant(email.length, 'Empty email argument');
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
}

async function sendTOTP({ email, code, magicLink }: SendTOTPOptions) {
  const user = await getUserByEmail(email);

  try {
    await sendTotpWithPostmark({ name: user.name, email, code, magicLink });
  } catch {
    await sendTotpWithResend({ name: user.name, email, code, magicLink });
  }
}

async function getUserById(id: number) {
  const user = await db.user.findUnique({ where: { id } });
  invariant(user !== null, `Unknown user id: ${id}`);
  return user;
}

export async function getUser(request: Request): Promise<User | null> {
  const sessionData = await authenticator.isAuthenticated(request);
  return null; // sessionData ? getUserById(sessionData.userId) : null;
}

export async function requireAdmin(request: Request) {
  const user = await getUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/login');
  }
}
