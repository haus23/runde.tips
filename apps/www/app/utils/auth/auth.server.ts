import { redirect } from '@remix-run/node';
import * as v from 'valibot';

import { queryBus } from '#utils/cqrs/query-bus';
import { sendMailWithPostmark, sendMailWithResend } from '#utils/email.server';
import { renderSendTotpEmail } from '#utils/emails/send-totp.email';
import { invariant } from '#utils/misc';

const emailSchema = v.pipe(
  v.string(),
  v.nonEmpty('Bitte Email-Adresse angeben.'),
  v.email('Ungültige Email-Adresse.'),
);

/**
 * Validates an email address. Only well known addresses are accepted.
 *
 * @param email Address to validate
 * @returns true if email is well known
 */
async function isKnownEmail(email: string) {
  const user = await queryBus.getUserByEmail(email);
  return user !== null;
}

/**
 * Loads user by email address
 * @param email
 * @returns User
 */
async function getUserByEmail(email: string) {
  const user = await queryBus.getUserByEmail(email);
  invariant(user !== null, `Unknown user email: ${email}`);
  return { ...user, email };
}

/**
 * Send generated one-time-password to user
 *
 * @param options
 */
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

  const result = v.safeParse(emailSchema, email);

  if (result.issues) {
    return {
      errors: { email: v.flatten<typeof emailSchema>(result.issues).root },
    };
  }

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

  sendTOTPEmail({
    email,
    code: '135762',
    magicLink: 'http://localhost:5173/magic-link',
  });

  /*
  sendTOTP(request, email);

  const session = await getSession(request);
  session.flash('email', email);
  session.flash('rememberMe', rememberMe);

  */
  throw redirect('/onboarding', {
    // headers: {
    //   'Set-Cookie': await commitSession(session),
    // },
  });
}
