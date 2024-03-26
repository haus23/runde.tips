import crypto from 'node:crypto';
import EventEmitter from 'node:events';

import { singleton } from './singleton.server';
import type { TaskToast, Toast } from './toast/types';

export type Events = {
  toast: Toast;
  task: TaskToast;
};

export const emitter = singleton('emitter', () => {
  const eventEmitter = new EventEmitter();

  return {
    emit<TEventName extends keyof Events>(
      eventName: TEventName,
      payload: Events[TEventName],
    ) {
      eventEmitter.emit(eventName, { ...payload, _id: crypto.randomUUID() });
    },

    on<TEventName extends keyof Events>(
      eventName: TEventName,
      handler: (payload: Events[TEventName]) => void,
    ) {
      eventEmitter.on(eventName, handler);
    },

    off<TEventName extends keyof Events>(
      eventName: TEventName,
      handler: (payload: Events[TEventName]) => void,
    ) {
      eventEmitter.off(eventName, handler);
    },
  };
});
