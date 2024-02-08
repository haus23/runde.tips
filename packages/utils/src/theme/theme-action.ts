import { type ActionFunctionArgs, json } from '@remix-run/node';
import * as v from 'valibot';
import { serverOnly$ } from 'vite-env-only';

import type { cookieSession } from '../session';
import { ThemeSchema, type ThemeSessionData } from './types';

type ThemeSession = ReturnType<typeof cookieSession<ThemeSessionData>>;

export const createThemeAction = serverOnly$(
  (themeSession: ThemeSession) =>
    async ({ request }: ActionFunctionArgs) => {
      const formData = await request.formData();

      const themeResult = v.safeParse(
        ThemeSchema,
        Object.fromEntries(formData.entries()),
      );

      const session = await themeSession.getSession(request);

      let cookieString: string;
      if (themeResult.success) {
        session.set('theme', themeResult.output);
        cookieString = await themeSession.commitSession(session);
      } else {
        cookieString = await themeSession.destroySession(session);
      }

      return json(null, { headers: { 'Set-Cookie': cookieString } });
    },
);
