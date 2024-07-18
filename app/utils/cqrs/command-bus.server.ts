import { EventEmitter } from 'node:events';
import { registerFirestore } from '#utils/db/firestore/command-listener';
import { registerSqlite } from '#utils/db/sqlite/command-listener';
import type { Command } from './commands';

const bus = new EventEmitter();

export const commandBus = {
  on(listener: (command: Command) => void) {
    bus.addListener('command', listener);
  },
  off(listener: (command: Command) => void) {
    bus.removeListener('command', listener);
  },
  emit(command: Command) {
    bus.emit('command', command);
  },
};

registerSqlite();
registerFirestore();
