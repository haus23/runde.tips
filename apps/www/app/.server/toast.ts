import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = unknown;
type SessionFlashData = {
  msg: string;
};

const toastSessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__toast',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getToast(request: Request) {
  const session = await toastSessionStorage.getSession(
    request.headers.get('Cookie'),
  );

  const headers = new Headers({
    'Set-Cookie': await toastSessionStorage.commitSession(session),
  });
  const message = session.get('msg');

  return { toast: { message }, headers };
}
