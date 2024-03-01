import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '#utils/auth/auth.server';

export function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: '/',
  });
}
