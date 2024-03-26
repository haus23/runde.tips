import { toast } from 'sonner';
import type { Toast } from './types';

function _toast(type: Toast['type'], text: string) {
  toast[type](text);
}

type PromiseResolveType = { text: string; description?: string };
type PromiseResolver = ((props: PromiseResolveType) => void) | undefined;
const serverPromises = new Map<
  ReturnType<typeof toast.promise>,
  { resolve: PromiseResolver }
>();

export function manualToast(text: string, description?: string) {
  let resolve: PromiseResolver = undefined;
  const promise = new Promise<PromiseResolveType>((resolv) => {
    resolve = resolv;
  });

  const toastId = toast.promise(promise, {
    loading: text,
    success: ({ text }: PromiseResolveType) => text,
    description: ({ description }: PromiseResolveType) => description,
  });
  // Found no way to set the description eager and with updating/resolving
  toast(text, { id: toastId, description });

  serverPromises.set(toastId, { resolve });
  return toastId;
}

export function updateManualToast(
  toastId: ReturnType<typeof toast.promise>,
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

export function resolveManualToast(
  toastId: ReturnType<typeof toast.promise>,
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
