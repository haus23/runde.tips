import type { QueryHandler } from '#utils/cqrs/query-handler';
import { db } from '#utils/db.server';

export const queryHandler = {
  getUserByEmail(email) {
    return db.user.findUnique({ where: { email } });
  },
  getVerification(email) {
    return db.verification.findUnique({
      where: { email },
      select: {
        email: true,
        secret: true,
        algorithm: true,
        period: true,
        digits: true,
        charSet: true,
        expirationDate: true,
      },
    });
  },
} satisfies QueryHandler;
