import { commandHandler } from '#utils/db/sqlite/foh-command-handler';
import type { CommandHandler } from './foh-command-handler';

export const commandBus = {
  ...commandHandler,
} satisfies CommandHandler;
