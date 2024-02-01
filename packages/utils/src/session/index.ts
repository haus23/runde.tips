import type { SessionData, SessionStorage } from '@remix-run/node';

export function createSessionResolver<
  TSession = SessionData,
  TFlash = TSession,
>(session: SessionStorage<TSession, TFlash>) {
  return async function resolver(request: Request) {
    const resolvedSession = await session.getSession(
      request.headers.get('Cookie'),
    );
    const commit = () => session.commitSession(resolvedSession);
    const destroy = () => session.destroySession(resolvedSession);

    return [resolvedSession, { commit, destroy }] as const;
  };
}
