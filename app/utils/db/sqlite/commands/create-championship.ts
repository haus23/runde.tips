import type { CreateChampionshipCommand } from '#utils/cqrs/commands';
import { db } from '#utils/db.server';

export async function createChampionshipCommand(
  data: CreateChampionshipCommand['payload'],
) {
  await db.championship.create({ data });
}
