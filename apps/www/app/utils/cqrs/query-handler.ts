import type { Prisma, Session, User } from '@prisma/client';

export interface QueryHandler {
  getSessionById(id: string): Promise<Session | null>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getVerification(
    email: string,
  ): Promise<Prisma.VerificationCreateInput | null>;
}
