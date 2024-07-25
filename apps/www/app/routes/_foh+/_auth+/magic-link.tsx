import type { LoaderFunctionArgs } from '@remix-run/node';
import { login } from '#utils/auth/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await login(request);
}
