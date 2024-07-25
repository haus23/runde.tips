import type { QueryHandler } from '#utils/cqrs/query-handler';
import { db } from '#utils/db.server';

export const queryHandler = {
  getSessionById(id) {
    return db.session.findFirst({
      where: { id },
    });
  },
  getUserById(id) {
    return db.user.findFirst({
      where: { id },
    });
  },
  getUserByEmail(email) {
    return db.user.findFirst({ where: { email } });
  },
  getVerification(email) {
    return db.verification.findFirst({
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
