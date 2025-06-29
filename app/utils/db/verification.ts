import { eq } from 'drizzle-orm';
import { verifications } from '~/db/schema';
import { db } from '../db.server';

export async function getVerificationByEmail(email: string) {
  return db.query.verifications.findFirst({
    where: (v, { eq }) => eq(v.email, email),
  });
}

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

export async function updateVerificationAttempts(id: string, attempts: number) {
  await db
    .update(verifications)
    .set({ attempts })
    .where(eq(verifications.id, id));
}
