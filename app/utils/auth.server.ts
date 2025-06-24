import { redirect } from 'react-router';
import type { User } from '~/prisma';

/**
 * Loads user from db - may be identified by the cookie session
 *
 * @param request Request object
 * @returns User or null
 */
async function getOptionalUser(_request: Request): Promise<User | null> {
  return null;
}

/**
 * Ensures no logged-in user
 *
 * @param request Request object
 */
export async function requireAnonymous(request: Request) {
  const user = await getOptionalUser(request);
  if (user) throw redirect('/');
}

/**
 * Ensures logged-in user is manager
 *
 * @param request Request object
 */
export async function requireManager(request: Request) {
  const user = await getOptionalUser(request);
  if (!user || user.role === 'ADMIN') {
    throw redirect('/login');
  }
}
