import type { CreateChampionshipCommand } from '#utils/api/commands';
import { db } from '#utils/db.server';

export async function createChampionshipCommand(
  data: CreateChampionshipCommand['payload'],
) {
  await db.championship.create({ data });
}
