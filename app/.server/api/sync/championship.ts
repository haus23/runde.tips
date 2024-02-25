import type { ToastMessage } from '#types';
import { db } from '#utils/db.server';
import { invariant } from '#utils/misc';
import { getFirestoreChampionshipById } from '../firestore/championship';
import { getLegacyMatches } from '../firestore/championship-match';
import { getLegacyChampionshipPlayers } from '../firestore/championship-player';
import { getLegacyRounds } from '../firestore/championship-round';
import { getLegacyTips } from '../firestore/championship-tip';

export async function syncChampionship(slug: string): Promise<ToastMessage> {
  // Look for championship in local data
  const championship = await db.championship.findUnique({ where: { slug } });

  // Nothing todo if already complete
  if (championship?.completed) {
    return {
      type: 'info',
      msg: 'Turnier war schon abgeschlossen und aktuell.',
    };
  }

  // Load legacy championship
  const legacyChampionship = await getFirestoreChampionshipById(slug);

  // Three ways to syncronize:
  // 1. Remote complete, local undefined -> Simple insert
  // 2. Remote uncomplete, local undefined -> Simple insert with preparing sync helper data
  // 3. Remote uncomplete, local defined -> Sync with helper data
  // 4. Remote complete, local defined -> Last sync with helper data and delete helper data

  const result = {
    type: 'error',
    msg: 'Diese Art des Abgleichs ist noch nicht implementiert',
  } satisfies ToastMessage;

  if (championship === null) {
    if (legacyChampionship.completed) {
      await syncBySimpleInsert(legacyChampionship);
      return {
        type: 'success',
        msg: `Turnier ${legacyChampionship.name} geladen.`,
      };
    }
    return result;
  }
  if (!legacyChampionship.completed) {
    return result;
  }
  return result;
}

async function getLegacyStandings(championshipId: string) {
  const legacyPlayers = await getLegacyChampionshipPlayers(championshipId);
  const legacyRounds = await getLegacyRounds(championshipId);
  const legacyMatches = await getLegacyMatches(championshipId);
  const legacyTips = await getLegacyTips(championshipId);

  return { legacyPlayers, legacyRounds, legacyMatches, legacyTips };
}

async function getMasterData() {
  const rulesets = await db.ruleset.findMany();
  const users = await db.user.findMany();
  const leagues = await db.user.findMany();
  const teams = await db.team.findMany();

  return { rulesets, users, leagues, teams };
}

async function syncBySimpleInsert(
  legacyCampionship: Awaited<ReturnType<typeof getFirestoreChampionshipById>>,
) {
  const legacyData = await getLegacyStandings(legacyCampionship.id);
  const masterData = await getMasterData();

  const ruleset = masterData.rulesets.find(
    (rs) => rs.slug === legacyCampionship.rulesId,
  );
  if (!ruleset) {
    throw new Error(`Unknown ruleset ${legacyCampionship.rulesId}`);
  }

  const championship = await db.championship.create({
    data: {
      slug: legacyCampionship.id,
      name: legacyCampionship.name,
      nr: legacyCampionship.nr,
      published: legacyCampionship.published,
      completed: legacyCampionship.completed,
      extraPointsPublished: legacyCampionship.extraPointsPublished,
      rulesetId: ruleset.id,
    },
  });

  // Extract rounds
  for (const r of legacyData.legacyRounds) {
    const round = await db.round.create({
      data: {
        nr: r.nr,
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        published: true,
        completed: true,
        tipsPublished: true,
      },
    });
    r.entityId = round.id;
  }

  // Extract matches
  for (const m of legacyData.legacyMatches) {
    const round = legacyData.legacyRounds.find((r) => r.id === m.roundId);
    invariant(typeof round !== 'undefined');

    const league = masterData.leagues.find((l) => l.slug === m.leagueId);
    const hometeam = masterData.teams.find((t) => t.slug === m.hometeamId);
    const awayteam = masterData.teams.find((t) => t.slug === m.awayteamId);

    const optionalProps = {
      date: m.date || undefined,
      leagueId: league?.id,
      hometeamId: hometeam?.id,
      awayteamId: awayteam?.id,
    };

    const match = await db.match.create({
      data: {
        nr: m.nr,
        result: m.result,
        points: m.points,
        championshipId: championship.id,
        roundId: round.entityId,
        ...optionalProps,
      },
    });
    m.entityId = match.id;
  }

  // Extract players
  for (const p of legacyData.legacyPlayers) {
    const user = masterData.users.find((u) => u.slug === p.playerId);
    invariant(typeof user !== 'undefined');

    const player = await db.player.create({
      data: {
        points: p.points,
        extraPoints: p.extraPoints,
        totalPoints: p.totalPoints,
        rank: p.rank,
        userId: user.id,
        championshipId: championship.id,
      },
    });
    p.entityId = player.id;
  }

  // Extract tips and keep order of tips
  for (const p of legacyData.legacyPlayers) {
    const legacyPlayerTips = legacyData.legacyTips.filter(
      (lt) => lt.playerId === p.id,
    );

    for (const m of legacyData.legacyMatches) {
      const legacyTip = legacyPlayerTips.find((lt) => lt.matchId === m.id);
      if (!legacyTip) continue;

      await db.tip.create({
        data: {
          championshipId: championship.id,
          playerId: p.entityId,
          matchId: m.entityId,
          tip: legacyTip.tip,
          joker: legacyTip.joker || undefined,
          extraJoker: legacyTip.extraJoker || undefined,
          lonelyHit: legacyTip.lonelyHit || undefined,
          points: legacyTip.points,
        },
      });
    }
  }
}
