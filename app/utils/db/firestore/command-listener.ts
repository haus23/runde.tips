import { apiCommandBus } from '#utils/api/command-bus.server.js';
import { createChampionshipCommand } from './commands/create-championship';

export function registerFirestore() {
  apiCommandBus.on(({ name, payload }) => {
    switch (name) {
      case 'CREATE_CHAMPIONSHIP':
        createChampionshipCommand(payload);
        break;

      default:
        throw new Error(`Firestore command ${name} not implemented`);
    }
  });
}
