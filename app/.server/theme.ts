import {
  type ActionFunctionArgs,
  createCookieSessionStorage,
  json,
} from '@remix-run/node';

import { type ThemeSessionData, themeSchema } from '#types';

const themeSessionStorage = createCookieSessionStorage<ThemeSessionData>({
  cookie: {
    name: '__theme',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getSession(request: Request) {
  return await themeSessionStorage.getSession(request.headers.get('Cookie'));
}

export function createThemeAction() {
  return async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const themeResult = themeSchema.safeParse(Object.fromEntries(formData));

    const session = await getSession(request);
    let cookieString: string;
    if (themeResult.success) {
      session.set('theme', themeResult.data);
      cookieString = await themeSessionStorage.commitSession(session);
    } else {
      cookieString = await themeSessionStorage.destroySession(session);
    }

    return json(null, { headers: { 'Set-Cookie': cookieString } });
  };
}
