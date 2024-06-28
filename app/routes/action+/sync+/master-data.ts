import type { ActionFunctionArgs } from '@remix-run/node';
import { namedAction } from 'remix-utils/named-action';
import { requireAdmin } from '#utils/auth/auth.server.ts';
import { syncLeagues } from '#utils/sync/leagues';
import { syncPlayers } from '#utils/sync/players';
import { syncRulesets } from '#utils/sync/rulesets';
import { syncTeams } from '#utils/sync/teams';
import { jsonWithToast } from '#utils/toast/toast.server';

export async function loader() {
  throw new Response('Not found', { status: 404 });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireAdmin(request);

  const formData = await request.formData();

  return namedAction(formData, {
    async players() {
      await syncPlayers();
      return jsonWithToast(null, {
        type: 'success',
        text: 'Spielerdaten synchronisiert.',
      });
    },
    async teams() {
      await syncTeams();
      return jsonWithToast(null, {
        type: 'success',
        text: 'Mannschaften/Teams synchronisiert.',
      });
    },
    async leagues() {
      await syncLeagues();
      return jsonWithToast(null, {
        type: 'success',
        text: 'Ligen synchronisiert.',
      });
    },
    async rulesets() {
      await syncRulesets();
      return jsonWithToast(null, {
        type: 'success',
        text: 'Regelwerke synchronisiert.',
      });
    },
  });
}
