import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { type SendTOTPOptions, TOTPStrategy } from 'remix-auth-totp-dev';

import { db } from '#utils/db.server';
import { sendTemplateEmail } from '#utils/email.server';
import { invariant } from '#utils/misc';

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

const { commitSession } = authSessionStorage;
const getSession = (request: Request) =>
  authSessionStorage.getSession(request.headers.get('Cookie'));
export { getSession, commitSession };

type AuthSessionData = {
  userId: number;
};

export const authenticator = new Authenticator<AuthSessionData>(
  authSessionStorage,
);

async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}

async function getUserByEmail(email: string) {
  invariant(email.length, 'Empty email argument');
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
}

async function sendTOTP({ email, code, magicLink }: SendTOTPOptions) {
  const user = await getUserByEmail(email);

  await sendTemplateEmail({
    to: `${user.name} <${email}>`,
    templateAlias: 'send-totp',
    templateModel: {
      product_url: 'https://runde.tips',
      product_name: 'Haus23 Tipprunde',
      name: user.name,
      code: code,
      magic_link: magicLink,
    },
  });
}

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.AUTH_ENCRYPTION_SECRET,
      sendTOTP,
      validateEmail: (email) => isKnownEmail(email),
      totpGeneration: { period: 360, charSet: '0123456789' },
      customErrors: {
        invalidEmail: 'Unbekannte Email-Adresse. Wende dich an Micha.',
        expiredTotp: 'Abgelaufener Code.',
        invalidTotp: 'Falscher Code.',
      },
    },
    async ({ email }) => {
      const user = await getUserByEmail(email);
      return { userId: user.id };
    },
  ),
);

async function getUserById(id: number) {
  const user = await db.user.findUnique({ where: { id } });
  invariant(user !== null, `Unknown user id: ${id}`);
  return user;
}

export async function getUser(request: Request) {
  const sessionData = await authenticator.isAuthenticated(request);
  return sessionData ? getUserById(sessionData.userId) : null;
}

export async function requireAdmin(request: Request) {
  const user = await getUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/login');
  }
}
