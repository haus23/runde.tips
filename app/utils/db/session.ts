import { eq } from 'drizzle-orm';
import { sessions } from '~/db/schema';
import { db } from '../db.server';
import { getRootUser } from './user';

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

export async function getSession(id: string) {
  const session = await db.query.sessions.findFirst({
    where: (session, { eq }) => eq(session.id, id),
    with: { user: true },
  });
  if (session && !session.user && session.userId === 0) {
    session.user = getRootUser();
  }
  return session;
}

export async function deleteSession(id: string) {
  await db.delete(sessions).where(eq(sessions.id, id));
}
