import type { users } from '~/db/schema';
import { env } from '../env.server';

const rootUser = {
  id: 0,
  email: env.ROOT_EMAIL,
  slug: 'root',
  name: 'Root',
  role: 'ADMIN',
} satisfies typeof users.$inferInsert;

/**
 * Gets a user bei its unique email
 *
 * @param email User email
 * @returns Promise resolving to user or undefined
 */
export async function getUserByEmail(email: string) {
  if (email === env.ROOT_EMAIL) {
    return rootUser;
  }
  return null;
}
