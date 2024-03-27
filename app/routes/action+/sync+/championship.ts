import { invariant } from '#utils/misc';
import { syncChampionship } from '#utils/sync/championship';
import { createTaskAction } from '#utils/task.server';

export const action = createTaskAction(async (formData, taskId) => {
  const championshipSlug = formData.get('championshipSlug');
  invariant(typeof championshipSlug === 'string');

  const championship = await syncChampionship(championshipSlug, taskId);
  return { championship };
});
