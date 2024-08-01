import { queryHandler } from '#utils/db/sqlite/query-handler';
import type { QueryHandler } from './query-handler';

export const queryBus = {
  ...queryHandler,
} satisfies QueryHandler;
