import type { ToastOptions } from 'react-aria-components';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';

const toastTypes = ['success', 'info', 'warning', 'error'] as const;
type ToastType = (typeof toastTypes)[number];

export type ToastData = {
  type: ToastType;
  message: string;
};

const toastQueue = new ToastQueue<ToastData>();

/**
 * Queues a toast in the toast queue
 *
 * @param message The toast message
 * @param type The toast type
 * @param options Toast options
 */
function toast(message: string, type?: ToastType, options?: ToastOptions): void;
function toast(message: string, options?: ToastOptions): void;
function toast(
  message: string,
  typeOrOptions?: ToastType | ToastOptions,
  options?: ToastOptions,
) {
  const type = typeof typeOrOptions === 'string' ? typeOrOptions : 'info';
  const toastOptions = {
    timeout: 5000,
    ...(typeof typeOrOptions === 'object' ? typeOrOptions : options),
  };
  toastQueue.add({ message, type }, toastOptions);
}

/**
 * Queues a success toast in the toast queue
 *
 * @param message The toast message
 * @param options Toast options
 */
toast.success = (message: string, options?: ToastOptions) =>
  toast(message, 'success', options);

/**
 * Queues an info toast in the toast queue
 *
 * @param message The toast message
 * @param options Toast options
 */
toast.info = (message: string, options?: ToastOptions) =>
  toast(message, 'info', options);

/**
 * Queues a warning toast in the toast queue
 *
 * @param message The toast message
 * @param options Toast options
 */
toast.warning = (message: string, options?: ToastOptions) =>
  toast(message, 'warning', options);

/**
 * Queues an error toast in the toast queue
 *
 * @param message The toast message
 * @param options Toast options
 */
toast.error = (message: string, options?: ToastOptions) =>
  toast(message, 'error', options);

export { toastQueue, toast };
