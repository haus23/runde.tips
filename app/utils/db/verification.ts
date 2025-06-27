import { verifications } from '~/db/schema';
import { db } from '../db.server';

export async function createOrUpdateVerification({
  email,
  ...data
}: typeof verifications.$inferInsert) {
  await db
    .insert(verifications)
    .values({ email, ...data })
    .onConflictDoUpdate({
      target: verifications.email,
      set: { ...data, attempts: 0 },
    })
    .returning();
}
