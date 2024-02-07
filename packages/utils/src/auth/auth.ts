import { redirect } from '@remix-run/node';
import type { cookieSession } from '../session';
import type { AuthSessionData } from './types';

type AuthSession<T extends AuthSessionData = AuthSessionData> = ReturnType<
  typeof cookieSession<T>
>;

export function createAuthModule(sessionStorage: AuthSession) {
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

  async function prepareOnboarding(
    request: Request,
    user: { name: string; email: string },
  ) {}

  return { getUserId, requireAnonymous, prepareOnboarding };
}
