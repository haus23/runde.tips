import { type AuthenticateOptions, Strategy } from 'remix-auth';
import type { AuthSessionData, authSessionStorage } from './session.server';

import { redirect } from '@remix-run/node';
import { invariant } from '#utils/misc.ts';

export interface TOTPVerifyParams {
  email: string;
  code: string;
}

export class TOTPStrategy extends Strategy<AuthSessionData, TOTPVerifyParams> {
  name = 'TOTP';

  async authenticate(
    request: Request,
    sessionStorage: typeof authSessionStorage,
    options: AuthenticateOptions,
  ): Promise<AuthSessionData> {
    // Get email from session
    const session = await sessionStorage.getSession(
      request.headers.get('Cookie'),
    );
    const email = session.get('email');
    invariant(typeof email !== 'undefined');

    // Get code from form data or magic link
    let code: string | undefined = undefined;
    if (request.method === 'POST') {
      const formData = await request.formData();
      code = String(formData.get('code'));
    } else if (request.method === 'GET') {
      const url = new URL(request.url);
      if (url.pathname !== 'magic-link') {
        throw new Error('Netter Versuch!');
      }
      if (url.searchParams.has('code')) {
        code = decodeURIComponent(url.searchParams.get('code') ?? '');
      }
    }
    invariant(typeof code !== 'undefined' && code !== '');

    const authData = await this.verify({ code, email });

    if (!options.successRedirect) return authData;

    session.set('sessionId', authData.sessionId);
    session.set('expires', authData.expires);

    throw redirect(options.successRedirect, {
      headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
    });
  }
}
