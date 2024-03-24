import { useEffect } from 'react';
import { useEventSource } from 'remix-utils/sse/react';
import { Toaster, toast } from 'sonner';
import { Icon } from '#components/ui';
import type { Toast } from './types';

function _Toaster() {
  // Listen to SSE toasts
  const toastData = useEventSource('/sse/toast', { event: 'toast' });

  useEffect(() => {
    if (toastData) {
      const { type, text } = JSON.parse(toastData) as Toast;
      toast[type](text);
    }
  }, [toastData]);

  return (
    <Toaster
      position="top-right"
      gap={6}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-popover border border-default rounded-lg shadow-medium w-full flex items-center gap-x-2 px-4 py-2',
        },
      }}
      icons={{
        success: <Icon className="text-accent" name="lucide/check" />,
      }}
    />
  );
}

export { _Toaster as Toaster };
