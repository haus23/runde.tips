import { generateTOTP } from '@epic-web/totp';
import type { User } from '@prisma/client';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { Authenticator } from 'remix-auth';

import { db } from '#utils/db.server.ts';
import {
  sendTotpWithPostmark,
  sendTotpWithResend,
} from '#utils/email.server.ts';
import { invariant } from '#utils/misc.ts';

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

async function sendTOTPEmail({
  email,
  code,
  magicLink,
}: { email: string; code: string; magicLink: string }) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);

  try {
    await sendTotpWithPostmark({ name: user.name, email, code, magicLink });
  } catch {
    await sendTotpWithResend({ name: user.name, email, code, magicLink });
  }
}

export async function sendTOTP(request: Request, email: string) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);

  // Generate TOTP and save data
  const { otp, secret, period, charSet, digits, algorithm } = generateTOTP({
    period: 300,
  });
  const expiresAt = new Date(Date.now() + period * 1000);
  await db.verification.upsert({
    where: { email },
    create: { email, secret, period, algorithm, digits, charSet, expiresAt },
    update: { email, secret, period, algorithm, digits, charSet, expiresAt },
  });

  // Generate Magic Link
  const url = new URL('/magic-link', new URL(request.url).origin);
  url.searchParams.set('code', otp);
  const magicLink = url.toString();

  sendTOTPEmail({ email, code: otp, magicLink });
}

// TODO: refactor from here

export async function getUserByEmail(email: string) {
  invariant(email.length, 'Empty email argument');
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
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
