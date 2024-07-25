import type { User } from '@prisma/client';

export interface QueryHandler {
  getUserByEmail(email: string): Promise<User | null>;
}
