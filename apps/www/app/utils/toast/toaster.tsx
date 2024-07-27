import { useRouteLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'ui';
import type { loader } from '#root';

function _Toaster() {
  // Listen to HTTP/Cookie toasts
  const loaderData = useRouteLoaderData<typeof loader>('root');

  useEffect(() => {
    const cookieToast = loaderData?.requestInfo.toast;
    if (cookieToast) {
      toast(cookieToast);
    }
  }, [loaderData?.requestInfo.toast]);

  return <Toaster />;
}

export { _Toaster as Toaster };
