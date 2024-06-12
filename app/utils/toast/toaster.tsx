import { useRouteLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import UI from '#components/ui';
import type { loader } from '#root';
import { toast } from './toast.client';

function _Toaster() {
  // Listen to HTTP/Cookie toasts
  const loaderData = useRouteLoaderData<typeof loader>('root');

  useEffect(() => {
    const cookieToast = loaderData?.requestInfo.toast;
    if (cookieToast) {
      const { type, text } = cookieToast;
      toast(type, text);
    }
  }, [loaderData?.requestInfo.toast]);

  return (
    <Toaster
      position="top-right"
      gap={6}
      duration={20000}
      className="sm:-mt-2 mr-2 xl:mr-0"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-popover border border-default rounded-lg shadow-medium w-full flex items-center gap-x-2 px-4 py-4',
          description: 'text-app-subtle',
        },
      }}
      icons={{
        success: <UI.Icon className="text-accent" name="lucide/check" />,
        info: <UI.Icon className="text-app" name="lucide/info" />,
        error: <UI.Icon className="text-error" name="lucide/circle-alert" />,
      }}
    />
  );
}

export { _Toaster as Toaster };
