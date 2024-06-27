import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import {
  authenticator,
  getSession,
  isKnownEmail,
} from '#utils/auth/auth.server.ts';
import { redirectWithToast } from '#utils/toast/toast.server.ts';

export async function loader({ request }: LoaderFunctionArgs) {
  const authSessionData = await authenticator.isAuthenticated(request);

  if (authSessionData) {
    return redirectWithToast('/', {
      type: 'info',
      text: 'Du bist schon eingeloggt!',
    });
  }

  const session = await getSession(request);
  const email = session.get('email');

  if (!email) throw redirect('/login');

  const validEmail = await isKnownEmail(email);
  if (!validEmail) throw Error('Netter Versuch!');

  return redirectWithToast('/', {
    type: 'error',
    text: 'Noch nicht implementiert',
  });
}
