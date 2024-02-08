import { json, redirect } from '@remix-run/node';
import type { cookieSession } from '../session';
import { generateLoginCode, validateLoginCode } from './totp';
import type { AuthFlashData, AuthSessionData } from './types';

type AuthSession<
  SessionData extends AuthSessionData = AuthSessionData,
  FlashData extends AuthFlashData = AuthFlashData,
> = ReturnType<typeof cookieSession<SessionData, FlashData>>;

export function createAuthModule(
  sessionStorage: AuthSession,
  sendCode: (email: string, name: string, code: string) => Promise<void>,
  verifyUser: (email: string) => Promise<AuthSessionData>,
) {
  const { getSession, commitSession, destroySession } = sessionStorage;

  async function getUserId(request: Request) {
    const session = await getSession(request);
    return session.get('userId') || null;
  }

  async function requireAnonymous(request: Request, redirectTo?: string) {
    const userId = await getUserId(request);
    if (userId !== null) {
      throw redirect(redirectTo || '/');
    }
  }

  async function onboarding(
    request: Request,
    user: { name: string; email: string },
    redirectTo?: string,
  ) {
    const { code, secret } = generateLoginCode();
    await sendCode(user.email, user.name, code);

    const session = await getSession(request);
    session.flash('secret', secret);
    session.flash('email', user.email);

    return redirect(redirectTo ?? '/onboarding', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  async function login(request: Request, code: string, redirectTo?: string) {
    const session = await getSession(request);

    const secret = session.get('secret');
    const email = session.get('email');

    if (!secret || !email) {
      throw new Error('No onboarding session. Unaible to validate code.');
    }

    const validCode = validateLoginCode(code, secret);

    if (!validCode) {
      return json({
        errors: {
          code: 'Falscher oder abgelaufener Code.',
        },
      });
    }

    const sessionData = await verifyUser(email);

    session.set('userId', sessionData.userId);
    return redirect(redirectTo ?? '/', {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  return { getUserId, requireAnonymous, onboarding, login };
}
