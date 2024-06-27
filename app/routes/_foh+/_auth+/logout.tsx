import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';
import { destroySession, getSession } from '#utils/auth/auth.server';

export function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const authSession = await getSession(request);

  const referer = request.headers.get('Referer') || '/';
  const isManagerRoute = new URL(referer).pathname.startsWith('/manager');

  if (isManagerRoute) {
    request.headers.delete('Referer');
  }

  throw redirectBack(request, {
    fallback: '/',
    headers: {
      'Set-Cookie': await destroySession(authSession),
    },
  });
}
