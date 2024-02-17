import { createCookieSessionStorage, json } from '@remix-run/node';
import type { ToastMessage } from '#app/types';

type SessionData = unknown;
type SessionFlashData = {
  toast: ToastMessage;
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
  const toast = session.get('toast');

  const headers = new Headers({
    'Set-Cookie': await toastSessionStorage.commitSession(session),
  });

  return { toast, headers };
}

async function createToastHeader(toast: ToastMessage) {
  const session = await toastSessionStorage.getSession();
  session.flash('toast', toast);
  const cookie = await toastSessionStorage.commitSession(session);
  return new Headers({ 'Set-Cookie': cookie });
}

function combineHeaders(
  ...headers: Array<ResponseInit['headers'] | null | undefined>
) {
  const combined = new Headers();
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value);
    }
  }
  return combined;
}

export async function jsonWithToast<T>(
  data: T,
  toast: ToastMessage,
  init?: ResponseInit,
) {
  const toastHeader = await createToastHeader(toast);
  const headers = new Headers(init?.headers);
  return json(data, {
    ...init,
    headers: combineHeaders(init?.headers, toastHeader),
  });
}
