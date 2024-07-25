import type { Prisma } from '@prisma/client';

export interface CommandHandler {
  upsertVerification(args: Prisma.VerificationCreateInput): Promise<void>;
}
