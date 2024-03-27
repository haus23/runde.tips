import { useBlocker, useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { resolveTaskToast, taskToast } from './toast/toast.client';

export function useTask(taskId: string, action: string) {
  const taskFetcher = useFetcher();
  const toastId = useRef(-1);
  const successMsg = useRef<string>('Done');
  const titleMsg = useRef<string>();

  // TODO: block UI visually while waiting
  useBlocker(() => {
    return taskFetcher.state !== 'idle';
  });

  function startTask(
    payload: FormData,
    messages: { title?: string; loading: string; success: string },
  ) {
    titleMsg.current = messages.title;
    successMsg.current = messages.success;

    toastId.current = taskToast(
      messages.title || messages.loading,
      messages.title && messages.loading,
    );
    payload.set('taskId', taskId);
    taskFetcher.submit(payload, { method: 'post', action });
  }

  useEffect(() => {
    if (taskFetcher.data) {
      resolveTaskToast(
        toastId.current,
        titleMsg.current || successMsg.current,
        titleMsg.current && successMsg.current,
      );
    }
  }, [taskFetcher.data]);

  return { startTask };
}
