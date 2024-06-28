import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { Authenticator } from 'remix-auth';

import { db } from '#utils/db.server.ts';
import {
  sendTotpWithPostmark,
  sendTotpWithResend,
} from '#utils/email.server.ts';
import { invariant } from '#utils/misc.ts';

import { type AuthSessionData, authSessionStorage } from './session.server';
import { TOTPStrategy } from './totp-strategy.server';

export const authenticator = new Authenticator<AuthSessionData>(
  authSessionStorage,
);

export async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}

async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
}

authenticator.use(
  new TOTPStrategy(async ({ email, code }) => {
    // Verify code
    const verificationData = await db.verification.findUnique({
      where: { email },
      select: {
        secret: true,
        algorithm: true,
        period: true,
        digits: true,
        charSet: true,
      },
    });
    invariant(verificationData);

    const isValid = verifyTOTP({ otp: code, ...verificationData });
    invariant(isValid !== null);

    // Create Session
    const user = await getUserByEmail(email);

    const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
    const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME);

    const sessionData = await db.session.create({
      select: { id: true },
      data: {
        userId: user.id,
        expirationDate,
      },
    });

    return { sessionId: sessionData.id, expires: expirationDate };
  }),
);

async function sendTOTPEmail({
  email,
  code,
  magicLink,
}: { email: string; code: string; magicLink: string }) {
  const user = await getUserByEmail(email);
  try {
    await sendTotpWithPostmark({ name: user.name, email, code, magicLink });
  } catch {
    await sendTotpWithResend({ name: user.name, email, code, magicLink });
  }
}

export async function sendTOTP(request: Request, email: string) {
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
