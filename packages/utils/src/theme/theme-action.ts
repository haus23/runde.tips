import { type ActionFunctionArgs, json } from '@remix-run/node';
import * as v from 'valibot';
import { serverOnly$ } from 'vite-env-only';

import type { createSessionResolver } from '../session';
import { type Theme, ThemeSchema } from './types';

type ThemeSessionResolver = ReturnType<
  typeof createSessionResolver<{ theme: Theme }>
>;

export const createThemeAction = serverOnly$(
  (resolver: ThemeSessionResolver) =>
    async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData();

      const themeResult = v.safeParse(
        ThemeSchema,
        Object.fromEntries(formData.entries()),
      );

      const [session, { commit, destroy }] = await resolver(request);

      let cookieString: string;
      if (themeResult.success) {
        session.set('theme', themeResult.output);
        cookieString = await commit();
      } else {
        cookieString = await destroy();
      }

      return json(null, { headers: { 'Set-Cookie': cookieString } });
    },
);
