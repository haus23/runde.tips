import { Toaster } from 'sonner';
import { Icon } from './ui';

function _Toaster() {
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
