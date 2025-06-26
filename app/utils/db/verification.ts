import type { Prisma } from '@prisma/client';
import { db } from '../db.server';

export async function createOrUpdateVerification({
  email,
  ...data
}: Prisma.VerificationCreateInput) {
  await db.verification.upsert({
    where: {
      email,
    },
    update: data,
    create: { email, ...data },
  });
}
