import { generateTOTP } from '@epic-web/totp';

import { env } from './env.server';

/**
 * Generates and stores TOTP login code.
 *
 * @param email User email the code will be associated with
 * @returns Code
 */
export async function createLoginCode(_email: string) {
  const { otp } = await generateTOTP({
    period: env.TOTP_PERIOD,
  });

  return otp;
}
