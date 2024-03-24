import type { LoaderFunctionArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils/sse/server';
import { emitter } from '#utils/emitter.server';
import type { Toast } from '#utils/toast/types';

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    function toastHandler(payload: Toast) {
      send({ event: 'toast', data: JSON.stringify(payload) });
    }
    emitter.on('toast', toastHandler);
    return () => emitter.off('toast', toastHandler);
  });
}
