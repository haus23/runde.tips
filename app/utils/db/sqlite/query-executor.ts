import type { QueryHandler } from '#utils/cqrs/queries';
import { db } from '#utils/db.server';

const queryHandler = {
  getUsers: () => db.user.findMany(),
  getTeams: () => db.team.findMany(),
} satisfies QueryHandler;

export function createSqliteQueryHandler(): QueryHandler {
  return queryHandler;
}
