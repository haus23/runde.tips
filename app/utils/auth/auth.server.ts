import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import type { User } from '@prisma/client';
import { json, redirect } from '@remix-run/node';
import { redirectBack } from 'remix-utils/redirect-back';

import { db } from '#utils/db.server';
import { sendMailWithPostmark, sendMailWithResend } from '#utils/email.server';
import { renderSendTotpEmail } from '#utils/emails/send-totp.email';
import { invariant } from '#utils/misc';
import { redirectWithToast } from '#utils/toast/toast.server';

import { commitSession, destroySession, getSession } from './session.server';

async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
}

async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
}

async function sendTOTPEmail({
  email,
  code,
  magicLink,
}: { email: string; code: string; magicLink: string }) {
  const user = await getUserByEmail(email);

  const mailProps = {
    from: 'Tipprunde <hallo@runde.tips>',
    to: `${user.name} <${email}>`,
    subject: 'Tipprunde Login Code',
    category: 'totp',
    ...(await renderSendTotpEmail({ name: user.name, code, magicLink })),
  };

  try {
    await sendMailWithPostmark(mailProps);
  } catch {
    await sendMailWithResend(mailProps);
  }
}

export async function sendTOTP(request: Request, email: string) {
  // Generate TOTP and save data
  const { otp, secret, period, charSet, digits, algorithm } = generateTOTP({
    period: 300,
  });
  const expiresAt = new Date(Date.now() + period * 1000);
  await db.verification.upsert({
    where: { email },
    create: { email, secret, period, algorithm, digits, charSet, expiresAt },
    update: { email, secret, period, algorithm, digits, charSet, expiresAt },
  });

  // Generate Magic Link
  const url = new URL('/magic-link', new URL(request.url).origin);
  url.searchParams.set('code', otp);
  const magicLink = url.toString();

  sendTOTPEmail({ email, code: otp, magicLink });
}

/**
 * Prepares user onboarding. Expects email in request form data.
 *
 * If no valid email address is in the form data, it returns an error.
 * Otherwise it redirects to the onboarding page.
 *
 * @param request Request object
 */
export async function signup(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const rememberMe = formData.get('rememberMe') === 'rememberMe';

  const validEmail = await isKnownEmail(email);
  if (!validEmail) {
    sendMailWithResend({
      from: 'security@runde.tips',
      to: 'Micha <micha@haus23.net>',
      category: 'security',
      subject: 'Signup error with invalid email',
      text: `Invalid email address: ${email}`,
    });
    return {
      errors: { email: 'Unbekannte Email-Adresse. Wende dich an Micha.' },
    };
  }

  sendTOTP(request, email);

  const session = await getSession(request);
  session.flash('email', email);
  session.flash('rememberMe', rememberMe);

  throw redirect('/onboarding', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

/**
 * Ensures ongoing signup action (email in session)
 *
 * @param request Request object
 */
export async function ensureSignup(request: Request) {
  const session = await getSession(request);
  const email = session.get('email');

  if (!email)
    throw await redirectWithToast('/login', {
      type: 'error',
      text: 'Kein Login gestartet.',
    });

  const validEmail = await isKnownEmail(email);
  if (!validEmail) throw Error('Netter Versuch!');

  return json(null);
}

/**
 * Performs user login
 *
 * Expects valid email in session and totp code in request.
 * Returns error for invalid data. Redirects to home otherwise.
 *
 * @param request Request object
 */
export async function login(request: Request) {
  const session = await getSession(request);
  const email = session.get('email');
  const rememberMe = session.get('rememberMe') ?? false;

  if (!email || !(await isKnownEmail(email))) {
    throw new Error('Netter Versuch! Keine gültige Email-Adresse!');
  }

  // Get code from form data or magic link
  let code: string | undefined = undefined;
  if (request.method === 'POST') {
    const formData = await request.formData();
    code = String(formData.get('code'));
  } else if (request.method === 'GET') {
    const url = new URL(request.url);
    if (url.pathname !== '/magic-link') {
      throw new Error('Netter Versuch!');
    }
    if (url.searchParams.has('code')) {
      code = decodeURIComponent(url.searchParams.get('code') ?? '');
    }
  }
  if (typeof code === 'undefined' || code === '') {
    throw new Error('Netter Versuch! Kein gültiger Login Code!');
  }

  // Verify code
  const verificationData = await db.verification.findUnique({
    where: { email },
    select: {
      secret: true,
      algorithm: true,
      period: true,
      digits: true,
      charSet: true,
      expiresAt: true,
    },
  });

  if (!verificationData) {
    throw new Error(
      'Netter Versuch! Keine Anmeldung für diese Email-Adresse vorhanden!',
    );
  }

  if (new Date() > verificationData.expiresAt) {
    return {
      errors: { code: 'Abgelaufener Code.' },
    };
  }

  const isValid = verifyTOTP({ otp: code, ...verificationData });
  if (isValid === null) {
    return {
      errors: { code: 'Ungültiger Code.' },
    };
  }

  // Create Server Session
  const user = await getUserByEmail(email);

  const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 30;
  const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME * 1000);

  const sessionData = await db.session.create({
    select: { id: true },
    data: {
      userId: user.id,
      expires: !rememberMe,
      expirationDate,
    },
  });

  session.set('sessionId', sessionData.id);
  session.set('expires', expirationDate);

  throw redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session, {
        ...(rememberMe && {
          maxAge: SESSION_EXPIRATION_TIME,
        }),
      }),
    },
  });
}

/**
 * Logs user out. If no redirectFallback is set, it returns the destroy session cookie
 * header. With redirectFallback it redirects to the referer or the fallback route
 * and destroys the session cookie itself.
 *
 * @param request Request object
 * @param redirectFallback Fallback URL if no referer in request
 * @returns destroy session cookie header
 */

export async function logout(request: Request, redirectFallback?: string) {
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (sessionId) {
    await db.session.deleteMany({ where: { id: sessionId } });
  }

  const headers = new Headers({
    'Set-Cookie': await destroySession(authSession),
  });

  if (redirectFallback) {
    throw redirectBack(request, { fallback: redirectFallback, headers });
  }

  return headers;
}

// Auth helpers

export async function getUser(request: Request) {
  let user: User | null = null;
  let headers: Headers | null = null;

  // Authenticate
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (sessionId) {
    const session = await db.session.findFirst({
      where: { id: sessionId },
    });

    // Existing server session and not expired?
    if (session && new Date() < session.expirationDate) {
      user = await db.user.findFirst({ where: { id: session.userId } });
    }

    if (!user) {
      headers = await logout(request);
    }
  }

  return {
    user,
    headers,
  };
}

async function getOptionalUser(request: Request) {
  const authSession = await getSession(request);
  const sessionId = authSession.get('sessionId');

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    select: { user: true },
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });

  return session?.user || null;
}

export async function requireAnonymous(request: Request) {
  const user = await getOptionalUser(request);
  if (user) {
    throw await redirectWithToast('/', {
      type: 'info',
      text: 'Du bist schon eingeloggt!',
    });
  }
}

export async function requireAdmin(request: Request) {
  const user = await getOptionalUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/login');
  }
}
