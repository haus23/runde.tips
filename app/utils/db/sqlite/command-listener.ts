import { commandBus } from '#utils/cqrs/command-bus.server';
import { createChampionshipCommand } from './commands/create-championship';

export function registerSqlite() {
  commandBus.on(({ name, payload }) => {
    switch (name) {
      case 'CREATE_CHAMPIONSHIP':
        createChampionshipCommand(payload);
        break;

      default:
        throw new Error(`Sqlite command ${name} not implemented`);
    }
  });
}
