import { generateTOTP } from '@epic-web/totp';
import { createOrUpdateVerification } from './db/verification';
import { env } from './env.server';

/**
 * Generates and stores TOTP login code.
 *
 * @param email User email the code will be associated with
 * @returns Code
 */
export async function createLoginCode(email: string) {
  const { otp, period, ...otpProps } = await generateTOTP({
    period: env.TOTP_PERIOD,
  });

  const expiresAt = new Date(Date.now() + period * 1000);
  await createOrUpdateVerification({
    email,
    expiresAt,
    period,
    ...otpProps,
  });

  return otp;
}
