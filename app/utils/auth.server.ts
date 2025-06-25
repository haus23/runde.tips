import { redirect } from 'react-router';
import type { User } from '~/prisma';
import { getUserByEmail } from './db/user';

/*
 * The main auth flow functions
 *
 * - prepareOnboarding(): validates onboarding email and sends TOTP and magic link via email
 * - ensureOnboarding(): ensures ongoing boarding
 * - verifyOnboardingCode(): validates TOTP and logs user in
 * - logout(): logs user out
 * - prolongRememberMeSession(): prolongs an eventually ongoing rememberMe-Session
 */

export async function prepareOnboarding(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email'));

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      errors: { email: 'Unbekannte Email-Adresse. Wende dich an Micha.' },
    };
  }

  console.log(user);
}

/*
 * The auth state functions
 *
 * - getUser(): called by the root loader, returns logged-in user or null
 * - requireAnonymous(): loader/action guard
 * - requireManager(): loader/action guard
 */

/**
 * Loads user from db - may be identified by the cookie session
 * Internal helper.
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
