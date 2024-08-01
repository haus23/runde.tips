import {
  type AriaToastProps,
  type AriaToastRegionProps,
  useToast,
  useToastRegion,
} from '@react-aria/toast';
import {
  ToastQueue,
  type ToastState,
  useToastQueue,
} from '@react-stately/toast';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { twJoin } from 'tailwind-merge';

import { Icon, type IconName } from './icon';

type ToastTypes = 'success' | 'info' | 'error';

const typeIconMapping = {
  success: 'check',
  info: 'info',
  error: 'shield-alert',
} satisfies Record<ToastTypes, IconName>;

const typeColors = {
  success: 'bg-success-50',
  info: 'bg-primary-50',
  error: 'bg-danger-50',
} satisfies Record<ToastTypes, string>;

export type Toast = {
  type: ToastTypes;
  title: string;
  description?: string;
};

const toastQueue = new ToastQueue<Toast>({
  maxVisibleToasts: 5,
});

export function toast(toast: Toast) {
  toastQueue.add(toast, { timeout: 5000 });
}

/*
 * Toast: The visible roasted Toast
 */

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

function RoastedToast<T extends Toast>({ state, ...props }: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, contentProps, titleProps, descriptionProps } = useToast(
    props,
    state,
    ref,
  );

  const toast = props.toast.content;
  return (
    <div
      {...toastProps}
      ref={ref}
      className={twJoin(
        'w-96 max-w-[80%] self-end rounded-medium bg-content2 p-4 shadow-medium',
        typeColors[toast.type],
      )}
    >
      <div {...contentProps}>
        <div {...titleProps} className="relative">
          <Icon
            name={typeIconMapping[toast.type]}
            className="absolute top-0.5"
          />
          <div className="pl-8">{toast.title}</div>
        </div>
        {toast.description && (
          <div
            {...descriptionProps}
            className="mt-2 text-foreground-500 text-sm"
          >
            {toast.description}
          </div>
        )}
      </div>
    </div>
  );
}

/*
 * ToastRegion: The Toast Container
 */

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

function ToastRegion<T extends Toast>({
  state,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div
      {...regionProps}
      ref={ref}
      className="fixed top-16 right-4 flex flex-col gap-y-2"
    >
      {state.visibleToasts.map((toast) => (
        <RoastedToast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}

/*
 * Toaster: The Toasting Service Provider
 */

export function Toaster() {
  const state = useToastQueue(toastQueue);

  // Render toast region.
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion state={state} />, document.body)
    : null;
}
