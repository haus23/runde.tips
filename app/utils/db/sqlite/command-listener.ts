import { apiCommandBus } from '#utils/api/command-bus.server.js';
import { createChampionshipCommand } from './commands/create-championship';

export function registerSqlite() {
  apiCommandBus.on(({ name, payload }) => {
    switch (name) {
      case 'CREATE_CHAMPIONSHIP':
        createChampionshipCommand(payload);
        break;

      default:
        throw new Error(`Sqlite command ${name} not implemented`);
    }
  });
}
