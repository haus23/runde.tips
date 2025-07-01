import type { InferSelectModel } from 'drizzle-orm';
import type { users } from '~/db/schema';
import { env } from '../env.server';

type User = InferSelectModel<typeof users>;

const rootUser = {
  id: 0,
  email: env.ROOT_EMAIL,
  slug: 'root',
  name: 'Root',
  role: 'ADMIN',
  createdAt: null,
  updatedAt: null,
} satisfies User;

/**
 * Gets root user
 */
export function getRootUser() {
  return rootUser;
}

/**
 * Gets a user by its pk
 */
export async function getUser(id: User['id']) {
  if (id === 0) {
    return rootUser;
  }
  return null;
}

/**
 * Gets a user by its unique email
 *
 * @param email User email
 * @returns Promise resolving to user or undefined
 */
export async function getUserByEmail(email: User['email']) {
  if (email === env.ROOT_EMAIL) {
    return rootUser;
  }
  return null;
}
