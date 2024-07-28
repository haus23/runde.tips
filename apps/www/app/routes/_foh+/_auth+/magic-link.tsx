import type { LoaderFunctionArgs } from '@remix-run/node';

import { ensureSignup, login, requireAnonymous } from '#utils/auth/auth.server';
import { redirectWithToast } from '#utils/toast/toast.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  await ensureSignup(request);
  const error = await login(request);

  return await redirectWithToast('/login', {
    type: 'error',
    title: error.errors.code,
  });
}
