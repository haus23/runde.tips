import { EventEmitter } from 'node:events';
import type { APICommand } from '#utils/api/commands';
import { registerFirestore } from '#utils/db/firestore/command-listener.js';
import { registerSqlite } from '#utils/db/sqlite/command-listener.js';

const bus = new EventEmitter();

export const apiCommandBus = {
  on(listener: (command: APICommand) => void) {
    bus.addListener('command', listener);
  },
  off(listener: (command: APICommand) => void) {
    bus.removeListener('command', listener);
  },
  emit(command: APICommand) {
    bus.emit('command', command);
  },
};

registerSqlite();
registerFirestore();
