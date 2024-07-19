import {
  type ActionFunctionArgs,
  createCookieSessionStorage,
  json,
} from '@remix-run/node';
import { safeParse } from 'valibot';

import { getHints } from './client-hints.server';
import { type Theme, themeSchema } from './types';

const themeSessionStorage = createCookieSessionStorage<{ theme: Theme }>({
  cookie: {
    name: '__theme',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getTheme(request: Request) {
  const session = await themeSessionStorage.getSession(
    request.headers.get('Cookie'),
  );

  return {
    hints: getHints(request),
    session: session.get('theme'),
  };
}

export function createThemeAction() {
  return async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const themeResult = safeParse(themeSchema, Object.fromEntries(formData));

    const session = await themeSessionStorage.getSession(
      request.headers.get('Cookie'),
    );

    let cookieString: string;
    if (themeResult.success) {
      session.set('theme', themeResult.output);
      cookieString = await themeSessionStorage.commitSession(session);
    } else {
      cookieString = await themeSessionStorage.destroySession(session);
    }

    return json(null, { headers: { 'Set-Cookie': cookieString } });
  };
}
