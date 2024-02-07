import type { SessionData, SessionStorage } from '@remix-run/node';

export function cookieSession<TSession = SessionData, TFlash = TSession>(
  session: SessionStorage<TSession, TFlash>,
) {
  const { getSession: getRawSession, commitSession, destroySession } = session;

  async function getSession(request: Request) {
    return getRawSession(request.headers.get('Cookie'));
  }

  return { getSession, commitSession, destroySession };
}
