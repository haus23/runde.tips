import { getUserByEmail, getUserById, isKnownEmail } from '@tipprunde/db';
import { db } from './db';

import { createCookieSessionStorage } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { TOTPStrategy } from 'remix-auth-totp-dev';

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.AUTH_SESSION_SECRET],
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

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.AUTH_ENCRYPTION_SECRET,
      sendTOTP: async ({ email, code, magicLink }) => {
        const user = await getUserByEmail(db, email);
        console.log(`Code für ${user.name}: ${code}, Link: ${magicLink}`);
      },
      validateEmail: (email) => isKnownEmail(db, email),
      totpGeneration: { period: 360, charSet: '0123456789' },
      customErrors: {
        invalidEmail: 'Unbekannte Email-Adresse. Wende dich an Micha.',
        expiredTotp: 'Abgelaufener Code.',
        invalidTotp: 'Falscher Code.',
      },
    },
    async ({ email }) => {
      const user = await getUserByEmail(db, email);
      return { userId: user.id };
    },
  ),
);

export async function getUser(request: Request) {
  const sessionData = await authenticator.isAuthenticated(request);
  return sessionData ? getUserById(db, sessionData.userId) : null;
}
