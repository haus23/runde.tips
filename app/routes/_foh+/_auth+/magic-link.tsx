import type { LoaderFunctionArgs } from '@remix-run/node';
import { ensureSignup, login } from '#utils/auth/auth.server.ts';
import { requireAnonymous } from '#utils/auth/utils.server.ts';
import { redirectWithToast } from '#utils/toast/toast.server.js';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAnonymous(request);
  await ensureSignup(request);
  const error = await login(request);

  return await redirectWithToast('/login', {
    type: 'error',
    text: error.errors.code,
  });
}
