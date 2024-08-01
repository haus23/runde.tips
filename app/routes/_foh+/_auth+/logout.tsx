import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { logout } from '#utils/auth/auth.server';

export function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const referer = request.headers.get('Referer') || '/';
  const isManagerRoute = new URL(referer).pathname.startsWith('/manager');

  if (isManagerRoute) {
    request.headers.delete('Referer');
  }

  await logout(request, '/');
}
