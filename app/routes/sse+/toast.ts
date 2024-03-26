import type { LoaderFunctionArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils/sse/server';
import { emitter } from '#utils/emitter.server';
import type { TaskToast, Toast } from '#utils/toast/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    console.log('Register handler');
    function toastHandler(payload: Toast) {
      send({ event: 'toast', data: JSON.stringify(payload) });
    }
    emitter.on('toast', toastHandler);

    function taskHandler(payload: TaskToast) {
      send({ event: 'task', data: JSON.stringify(payload) });
    }

    emitter.on('toast', toastHandler);
    emitter.on('task', taskHandler);

    return () => {
      emitter.off('toast', toastHandler);
      emitter.off('task', taskHandler);
    };
  });
}
