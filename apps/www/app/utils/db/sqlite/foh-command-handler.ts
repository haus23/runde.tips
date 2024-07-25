import type { CommandHandler } from '#utils/cqrs/foh-command-handler';
import { db } from '#utils/db.server';

export const commandHandler = {
  async upsertVerification(args) {
    await db.verification.upsert({
      where: { email: args.email },
      create: args,
      update: args,
    });
  },
} satisfies CommandHandler;
