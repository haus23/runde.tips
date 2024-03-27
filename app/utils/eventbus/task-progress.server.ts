import { EventEmitter } from 'node:events';

const bus = new EventEmitter();

export type TaskProgressEvent = Readonly<{
  taskId: string;
}>;

export const taskProgressEventBus = {
  on<T>(taskId: string, listener: (event: T) => void) {
    bus.addListener(taskId, listener);
  },
  off<T>(taskId: string, listener: (event: T) => void) {
    bus.removeListener(taskId, listener);
  },
  emit<T extends TaskProgressEvent>(event: T) {
    bus.emit(event.taskId, event);
  },
};
