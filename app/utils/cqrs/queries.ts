import type { Team, User } from '@prisma/client';

export interface QueryHandler {
  getUsers(): Promise<Array<User>>;
  getTeams(): Promise<Array<Team>>;
}
