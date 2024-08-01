import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

import type { Toast } from '#components/ui/toast';
import { combineHeaders } from '../misc';

type SessionData = unknown;
type SessionFlashData = {
  toast: Toast;
};

const toastSessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__app',
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
  const toast = session.get('toast');

  return {
    toast,
    headers: toast
      ? new Headers({
          'Set-Cookie': await toastSessionStorage.destroySession(session),
        })
      : null,
  };
}

async function createToastHeaders(toast: Toast) {
  const session = await toastSessionStorage.getSession();
  session.flash('toast', toast);
  const cookie = await toastSessionStorage.commitSession(session);
  return new Headers({ 'Set-Cookie': cookie });
}

export async function jsonWithToast<T>(
  data: T,
  toast: Toast,
  init?: ResponseInit,
) {
  const toastHeader = await createToastHeaders(toast);
  return json(data, {
    ...init,
    headers: combineHeaders(init?.headers, toastHeader),
  });
}

export async function redirectWithToast(
  url: string,
  toast: Toast,
  init?: ResponseInit,
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast)),
  });
}
