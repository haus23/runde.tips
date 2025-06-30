import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  InfoIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { useRouteLoaderData } from 'react-router';
import type { loader } from '~/root';
import { cva } from '~/utils/cva';
import type { ToastData } from '~/utils/toast';
import { toast, toastQueue } from '~/utils/toast';

const toasterClasses = cva({
  base: ['fixed top-4 right-4', 'flex flex-col-reverse items-end gap-2'],
});
const toastClasses = cva({
  base: [
    'border py-2 pr-4 pl-3',
    'flex max-w-xs items-center gap-3',
    'bg-root text-sm',
  ],
});

const toastIcons = {
  success: <CircleCheckBigIcon className="size-5 shrink-0" />,
  info: <InfoIcon className="size-5 shrink-0" />,
  warning: <CircleAlertIcon className="size-5 shrink-0" />,
  error: <CircleXIcon className="size-5 shrink-0" />,
} satisfies Record<ToastData['type'], React.ReactElement>;

export function Toaster() {
  const data = useRouteLoaderData<typeof loader>('root');

  useEffect(() => {
    if (data?.toast) {
      const {
        data: { message, type },
        options,
      } = data.toast;
      toast(message, type, options);
    }
  }, [data?.toast]);

  return (
    <ToastRegion queue={toastQueue} className={toasterClasses()}>
      {({ toast }) => (
        <Toast toast={toast} className={toastClasses()}>
          {toastIcons[toast.content.type]}
          <ToastContent>{toast.content.message}</ToastContent>
        </Toast>
      )}
    </ToastRegion>
  );
}
