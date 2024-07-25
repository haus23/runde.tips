import type { QueryHandler } from '#utils/cqrs/query-handler';
import { db } from '#utils/db.server';

export const queryHandler = {
  getUserByEmail(email) {
    return db.user.findUnique({ where: { email } });
  },
} satisfies QueryHandler;
