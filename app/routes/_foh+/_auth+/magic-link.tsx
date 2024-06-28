import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { isKnownEmail } from '#utils/auth/auth.server.ts';
import { getSession } from '#utils/auth/session.server.ts';
import { requireAnonymous } from '#utils/auth/utils.server.ts';
import { redirectWithToast } from '#utils/toast/toast.server.ts';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);

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
