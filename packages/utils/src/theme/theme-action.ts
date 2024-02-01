import { type ActionFunctionArgs, json } from '@remix-run/node';
import * as v from 'valibot';

import type { createSessionResolver } from '../session';
import { type Theme, ThemeSchema } from './types';

type ThemeSessionResolver = ReturnType<
  typeof createSessionResolver<{ theme: Theme }>
>;

export function createThemeAction(resolver: ThemeSessionResolver) {
  return async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const theme = v.parse(ThemeSchema, Object.fromEntries(formData.entries()));

    const [session, { commit, destroy }] = await resolver(request);

    session.set('theme', theme);

    const cookieString =
      theme.colorScheme === 'system' ? await destroy() : await commit();

    return json({ success: true }, { headers: { 'Set-Cookie': cookieString } });
  };
}
