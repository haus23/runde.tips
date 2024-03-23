import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';
import { authSessionStorage } from '#utils/auth/auth.server';

export function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get('Cookie'),
  );
  const referer = request.headers.get('Referer') || '/';
  const isManagerRoute = new URL(referer).pathname.startsWith('/manager');

  if (isManagerRoute) {
    request.headers.delete('Referer');
  }

  throw redirectBack(request, {
    fallback: '/',
    headers: {
      'Set-Cookie': await authSessionStorage.destroySession(authSession),
    },
  });
}
