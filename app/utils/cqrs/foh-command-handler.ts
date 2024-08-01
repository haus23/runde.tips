import type { Prisma } from '@prisma/client';

export interface CommandHandler {
  upsertVerification(
    verification: Prisma.VerificationCreateInput,
  ): Promise<void>;
  createSession(
    sessionData: Prisma.SessionCreateArgs['data'],
  ): Promise<{ id: string }>;
  updateSession(
    id: string,
    sessionData: Prisma.SessionUpdateArgs['data'],
  ): Promise<void>;
  deleteSession(id: string): Promise<void>;
}
