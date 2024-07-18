import type { CreateChampionshipCommand } from '#utils/cqrs/commands';
import { db } from '#utils/db.server.js';
import { invariant } from '#utils/misc.js';
import type { Championship } from '../model/championship';
import { createEntity } from '../repository/create-entity';

export async function createChampionshipCommand(
  data: CreateChampionshipCommand['payload'],
) {
  // Map rulesetId
  const ruleset = await db.ruleset.findFirst({ where: { id: data.rulesetId } });
  invariant(ruleset);

  await createEntity<Championship>('championships', {
    id: data.slug,
    name: data.name,
    nr: data.nr,
    rulesId: ruleset.slug,
    published: false,
    completed: false,
    extraPointsPublished: false,
  });
}
