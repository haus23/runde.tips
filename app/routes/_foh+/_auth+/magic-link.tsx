import type { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '#utils/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
}
