import { type ActionFunctionArgs, json } from '@remix-run/node';
import { emitter } from '#utils/emitter.server';
import { invariant } from '#utils/misc';
import { syncChampionship } from '#utils/sync/championship';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const championshipSlug = formData.get('slug');
  invariant(typeof championshipSlug === 'string');
  const taskId = formData.get('taskId');
  invariant(typeof taskId === 'string');

  const championship = await syncChampionship(
    championshipSlug,
    Number.parseInt(taskId),
  );

  emitter.emit('task', {
    taskId: Number.parseInt(taskId),
    mode: 'resolve',
    text: `Abgleich ${championship.name}.`,
    description: 'Fertig. Synchronisierung abgeschlossen.',
  });

  return json(null);
}
