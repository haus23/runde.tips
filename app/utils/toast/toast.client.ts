import { toast } from 'sonner';
import type { TaskToast, Toast } from './types';

function _toast(type: Toast['type'], text: string) {
  toast[type](text);
}

type PromiseData = Pick<TaskToast, 'text' | 'description'>;
type PromiseResolver = ((props: PromiseData) => void) | undefined;

const serverPromises = new Map<
  ReturnType<typeof toast.promise>,
  { resolve: PromiseResolver }
>();

export function taskToast(text: string, description?: string) {
  let resolve: PromiseResolver = undefined;
  const promise = new Promise<PromiseData>((resolv) => {
    resolve = resolv;
  });

  const toastId = toast.promise(promise, {
    loading: text,
    success: ({ text }: PromiseData) => text,
    description: ({ description }: PromiseData) => description,
  });
  // Found no way to set the description eager and with updating/resolving
  toast(text, { id: toastId, description });

  serverPromises.set(toastId, { resolve });
  return toastId;
}

export function updateTaskToast(
  toastId: number,
  text: string,
  description?: string,
) {
  if (serverPromises.has(toastId)) {
    const serverPromise = serverPromises.get(toastId);
    if (serverPromise) {
      toast(text, {
        id: toastId,
        description,
      });
    }
  }
}

export function resolveTaskToast(
  toastId: number,
  text: string,
  description?: string,
) {
  if (serverPromises.has(toastId)) {
    const serverPromise = serverPromises.get(toastId);
    if (serverPromise) {
      const { resolve } = serverPromise;
      resolve?.call(null, { text, description });
      serverPromises.delete(toastId);
    }
  }
}

export { _toast as toast };
