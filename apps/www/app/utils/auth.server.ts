import { findUserByEmail, getUserById } from '@tipprunde/db';
import { invariant } from '@tipprunde/utils';
import { createAuthModule } from '@tipprunde/utils/auth';
import { db } from './db.server';
import { authSession } from './sessions.server';

export const auth = createAuthModule(
  authSession,
  async (email, name, code) => {
    console.log(code);
  },
  async (email) => {
    const user = await findUserByEmail(db, email);
    invariant(user !== null);
    invariant(user.email !== null);
    return { userId: user.id };
  },
);

export async function getUser(request: Request) {
  const userId = await auth.getUserId(request);
  return userId !== null ? getUserById(db, userId) : null;
}
