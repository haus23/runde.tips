import type { LoaderFunctionArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils/sse/server';
import {
  type TaskProgressEvent,
  taskProgressEventBus,
} from '#utils/eventbus/task-progress.server';
import { invariant } from '#utils/misc';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const taskId = params.taskId;
  invariant(typeof taskId === 'string');

  return eventStream(request.signal, (send) => {
    const handle = (event: TaskProgressEvent) => {
      send({
        event: event.taskId,
        data: JSON.stringify(event),
      });
    };

    taskProgressEventBus.on(taskId, handle);

    return () => {
      taskProgressEventBus.off(taskId, handle);
    };
  });
}
