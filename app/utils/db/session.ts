import { sessions } from '~/db/schema';
import { db } from '../db.server';

export async function createSession(
  userId: number,
  expiresAt: Date,
  rememberMe?: boolean,
) {
  const session = (
    await db
      .insert(sessions)
      .values({
        userId,
        expiresAt,
        expires: !rememberMe,
      })
      .returning()
  ).at(0);

  if (!session) {
    throw new Error('Problem beim Anlegen der Sitzung.');
  }
  return session;
}
