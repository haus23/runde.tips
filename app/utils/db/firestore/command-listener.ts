import { commandBus } from '#utils/cqrs/command-bus.server';
import { createChampionshipCommand } from './commands/create-championship';

export function registerFirestore() {
  commandBus.on(({ name, payload }) => {
    switch (name) {
      case 'CREATE_CHAMPIONSHIP':
        createChampionshipCommand(payload);
        break;

      default:
        throw new Error(`Firestore command ${name} not implemented`);
    }
  });
}
