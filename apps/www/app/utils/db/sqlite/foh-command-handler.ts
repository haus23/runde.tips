import type { CommandHandler } from '#utils/cqrs/foh-command-handler';
import { db } from '#utils/db.server';

export const commandHandler = {
  async upsertVerification(verificationData) {
    await db.verification.upsert({
      where: { email: verificationData.email },
      create: verificationData,
      update: verificationData,
    });
  },
  async createSession(sessionData) {
    return await db.session.create({
      select: { id: true },
      data: sessionData,
    });
  },
  async deleteSession(id) {
    await db.session.delete({ where: { id } });
  },
} satisfies CommandHandler;
