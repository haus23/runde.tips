import { PrismaClient } from '@prisma/client';
import { invariant } from '@tipprunde/utils';

export type { User } from '@prisma/client';

export async function getUserById(db: PrismaClient, id: number) {
  const user = await db.user.findUnique({ where: { id } });
  invariant(user !== null, `Unknown user id: ${id}`);
  return user;
}

export async function getUserByEmail(db: PrismaClient, email: string) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown email: ${email}`);
  return user;
}

export async function isKnownEmail(db: PrismaClient, email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}
