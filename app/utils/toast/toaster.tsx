import { useRouteLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useEventSource } from 'remix-utils/sse/react';
import { Toaster } from 'sonner';
import { Icon } from '#components/ui';
import type { loader } from '#root';
import { resolveTaskToast, toast, updateTaskToast } from './toast.client';
import type { TaskToast, Toast } from './types';

function _Toaster() {
  // Listen to HTTP/Cookie toasts
  const loaderData = useRouteLoaderData<typeof loader>('root');
  // Listen to SSE toasts
  const toastData = useEventSource('/sse/toast', { event: 'toast' });
  // Listen to SSE manual toast updates
  const taskToastData = useEventSource('/sse/toast', { event: 'task' });

  useEffect(() => {
    const cookieToast = loaderData?.requestInfo.toast;
    if (cookieToast) {
      const { type, text } = cookieToast;
      toast(type, text);
    }
  }, [loaderData?.requestInfo.toast]);

  useEffect(() => {
    if (toastData) {
      const { type, text } = JSON.parse(toastData) as Toast;
      toast(type, text);
    }
  }, [toastData]);

  useEffect(() => {
    if (taskToastData) {
      const { taskId, mode, text, description } = JSON.parse(
        taskToastData,
      ) as TaskToast;
      if (mode === 'resolve') {
        resolveTaskToast(taskId, text, description);
      } else {
        updateTaskToast(taskId, text, description);
      }
    }
  }, [taskToastData]);

  return (
    <Toaster
      position="top-right"
      gap={6}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-popover border border-default rounded-lg shadow-medium w-full flex items-center gap-x-2 px-4 py-2',
          description: 'text-app-subtle',
        },
      }}
      icons={{
        success: <Icon className="text-accent" name="lucide/check" />,
        info: <Icon className="text-app" name="lucide/info" />,
        error: <Icon className="text-error" name="lucide/circle-alert" />,
      }}
    />
  );
}

export { _Toaster as Toaster };
