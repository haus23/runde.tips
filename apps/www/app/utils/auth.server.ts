import { getUserById } from '@tipprunde/db';
import { createAuthModule } from '@tipprunde/utils/auth';
import { db } from './db.server';
import { authSession } from './sessions.server';

export const auth = createAuthModule(authSession);

export async function getUser(request: Request) {
  const userId = await auth.getUserId(request);
  return userId !== null ? getUserById(db, userId) : null;
}
