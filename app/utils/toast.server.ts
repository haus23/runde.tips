import type { ToastOptions } from 'react-aria-components';
import { commitAppSession, getAppSession } from './sessions.server';
import type { ToastData } from './toast';

export async function createServerToast(
  request: Request,
  toastData: Omit<ToastData, 'type'> & { type?: ToastData['type'] },
  toastOptions?: ToastOptions,
) {
  const session = await getAppSession(request);
  const data = { type: 'info', ...toastData } as const;
  const options = {
    timeout: 5000,
    ...toastOptions,
  };
  session.flash('toast', { data, options });
  const cookie = await commitAppSession(session);
  return new Headers({ 'Set-Cookie': cookie });
}

export async function getServerToast(request: Request) {
  const session = await getAppSession(request);
  const toast = session.get('toast');

  return {
    toast,
    headers: toast
      ? new Headers({
          'Set-Cookie': await commitAppSession(session),
        })
      : null,
  };
}
