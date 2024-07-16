import { createSqliteQueryHandler } from '#utils/db/sqlite/query-executor';

const queryHandler = createSqliteQueryHandler();

export const queryExecutor = {
  ...queryHandler,
};
