import { redirect } from '@remix-run/node';
import * as v from 'valibot';

const emailSchema = v.pipe(
  v.string(),
  v.nonEmpty('Bitte Email-Adresse angeben.'),
  v.email('Ungültige Email-Adresse.'),
);

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

  if (email !== 'micha@haus23.net') {
    return {
      errors: { email: 'Unbekannte Email-Adresse. Wende dich an Micha.' },
    };
  }

  /*
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

  */
  throw redirect('/onboarding', {
    // headers: {
    //   'Set-Cookie': await commitSession(session),
    // },
  });
}
