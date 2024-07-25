import type { Prisma, User } from '@prisma/client';

export interface QueryHandler {
  getUserByEmail(email: string): Promise<User | null>;
  getVerification(
    email: string,
  ): Promise<Prisma.VerificationCreateInput | null>;
}
