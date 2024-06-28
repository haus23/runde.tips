import { type ActionFunctionArgs, json } from '@remix-run/node';
import { requireAdmin } from './auth/auth.server';
import { invariant } from './misc';

export function createTaskAction<T>(
  runner: (formData: FormData, taskId: string) => Promise<T>,
) {
  return async ({ request }: ActionFunctionArgs) => {
    await requireAdmin(request);

    const formData = await request.formData();

    const taskId = formData.get('taskId');
    invariant(typeof taskId === 'string');
    formData.delete('taskId');

    const result = await runner(formData, taskId);
    return json({ taskId, result });
  };
}
