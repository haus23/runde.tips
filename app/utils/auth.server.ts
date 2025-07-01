import { redirect } from 'react-router';
import type { users } from '~/db/schema';
import { createSession, deleteSession, getSession } from './db/session';
import { getUserByEmail } from './db/user';
import { sendCodeMail } from './emails.server';
import { env } from './env.server';
import { combineHeaders } from './misc';
import {
  commitAuthSession,
  destroyAuthSession,
  getAuthSession,
} from './sessions.server';
import { createServerToast } from './toast.server';
import { createLoginCode, verifyLoginCode } from './totp.server';

type User = typeof users.$inferSelect;

/*
 * The main auth flow functions
 *
 * - restoreLastAuthSession(): loads last used email from auth session
 * - prepareOnboarding(): validates onboarding email and sends TOTP and magic link via email
 * - ensureOnboarding(): ensures ongoing boarding
 * - verifyOnboardingCode(): validates TOTP and logs user in
 * - logout(): logs user out
 * - prolongRememberMeSession(): prolongs an eventually ongoing rememberMe-Session
 */

/**
 * Loads last used email from auth session
 *
 * @param request Request object
 * @returns Object with email in session - if any
 */
export async function restoreLastAuthSession(request: Request) {
  const session = await getAuthSession(request);
  const email = session.get('email');

  return { email };
}

/**
 * Prepares users onboarding. Expects email in request form data.
 *
 * If no valid email address is in the form data, it returns an error.
 * Otherwise, it creates an onboarding code and redirects to the onboarding page
 * to let the user enter the mailed code.
 *
 * @param request Request object
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

  const code = await createLoginCode(email);
  await sendCodeMail(request, { userName: user.name, code, email });

  const session = await getAuthSession(request);
  session.flash('email', email);

  const toast = await createServerToast(request, {
    message:
      'Eine Email mit einem Login-Code wurde an deine Email-Adresse gesendet.',
  });

  throw redirect('/verify', {
    headers: combineHeaders(
      {
        'Set-Cookie': await commitAuthSession(session),
      },
      toast,
    ),
  });
}

/**
 * Ensures that there is an ongoing onboarding session.
 *
 * Prevents the route from being called directly without email verification
 *
 * @param request Request object
 */
export async function ensureOnboardingSession(request: Request) {
  const session = await getAuthSession(request);
  const email = session.get('email');

  // TODO: toast with wrong browser message
  if (!email) {
    const toast = await createServerToast(request, {
      type: 'error',
      message: 'Kein aktueller Anmeldeversuch. Bitte erst Code anfordern.',
    });
    throw redirect('/login', { headers: toast });
  }

  // Ensure again valid email in session
  const user = await getUserByEmail(email);
  if (!user) throw Error('Netter Versuch!');

  return { session, email, user };
}

/**
 * Performs user login
 *
 * Expects valid email in session and totp code in request.
 * Returns error for invalid data. Logs the user in and redirects to home otherwise.
 *
 * @param request Request object
 * @returns Login errors or redirects
 */
export async function verifyOnboardingCode(request: Request) {
  const { session, email, user } = await ensureOnboardingSession(request);

  const formData = await request.formData();
  const code = String(formData.get('code'));

  if (!code) {
    return {
      errors: { code: 'Du musst Deinen Code eingeben, um fortzufahren.' },
    };
  }

  const verifyResult = await verifyLoginCode(email, code);
  if (!verifyResult.success) {
    if (!verifyResult.retry) {
      const toast = await createServerToast(request, {
        message: verifyResult.error,
        type: 'error',
      });

      throw redirect('/login', {
        headers: combineHeaders(
          verifyResult.severe && {
            'Set-Cookie': await destroyAuthSession(session),
          },
          toast,
        ),
      });
    }
    return { errors: { code: verifyResult.error } };
  }

  // Create the app session
  const expirationDate = new Date(Date.now() + env.SESSION_DURATION * 1000);

  // Log the user in
  const { id: sessionId } = await createSession(user.id, expirationDate);
  session.set('sessionId', sessionId);

  const toast = await createServerToast(request, {
    type: 'success',
    message: `Hallo ${user.name}! Du bist drin.`,
  });
  throw redirect('/', {
    headers: combineHeaders(
      {
        'Set-Cookie': await commitAuthSession(session),
      },
      toast,
    ),
  });
}

/*
 * The auth state functions
 *
 * - getUser(): called by the root loader, returns logged-in user or null
 * - requireAnonymous(): loader/action guard
 * - requireManager(): loader/action guard
 */

/**
 * Validates app session and returns logged-in user or null.
 * In case of an invalid session, all session data will be deleted.
 *
 * This function is the main authentication point, it is only called from the root loader.
 *
 * @param request Request Object
 * @returns User or null
 */
export async function getUser(request: Request) {
  const authSession = await getAuthSession(request);
  const sessionId = authSession.get('sessionId');

  // No client session? Exit early
  if (!sessionId) {
    return {
      user: null,
      headers: null,
    };
  }

  const session = await getSession(sessionId);

  // No server session? Log the user out from the client and exit
  if (!session) {
    return {
      user: null,
      headers: {
        'Set-Cookie': await destroyAuthSession(authSession),
      },
    };
  }

  // No user or expired server session? Destroy server session and log user out from the client
  // This covers the rare case that the user account is already deleted, but there is still a browser session
  const user = session.user;
  if (!user || new Date() > session.expiresAt) {
    await deleteSession(sessionId);
    return {
      user: null,
      headers: {
        'Set-Cookie': await destroyAuthSession(authSession),
      },
    };
  }

  return {
    user,
    headers: null,
  };
}

/**
 * Loads user from db - may be identified by the cookie session
 * Internal helper.
 *
 * @param request Request object
 * @returns User or null
 */
async function getOptionalUser(request: Request): Promise<User | null> {
  const authSession = await getAuthSession(request);
  const sessionId = authSession.get('sessionId');

  if (!sessionId) return null;

  const session = await getSession(sessionId);

  return session?.user || null;
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
  if (!user || user.role !== 'ADMIN') {
    throw redirect('/login');
  }
}
