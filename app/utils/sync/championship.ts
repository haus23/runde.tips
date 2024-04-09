import type { Championship } from '@prisma/client';
import { db } from '#utils/db.server';
import { taskProgressEventBus } from '#utils/eventbus/task-progress.server';
import { invariant } from '#utils/misc';
import { getFirestoreChampionshipById } from '../firestore/championship';
import { getLegacyMatches } from '../firestore/championship-match';
import { getLegacyChampionshipPlayers } from '../firestore/championship-player';
import { getLegacyRounds } from '../firestore/championship-round';
import { getLegacyTips } from '../firestore/championship-tip';

export async function syncChampionship(
  slug: string,
  taskId: string,
): Promise<Championship> {
  // Look for championship in local data
  const championship = await db.championship.findUnique({ where: { slug } });

  // Nothing todo if already complete
  if (championship?.completed) {
    throw new Error('Fehler: Turnier war schon abgeschlossen und ist aktuell.');
  }

  // Load legacy championship
  const legacyChampionship = await getFirestoreChampionshipById(slug);

  // Two ways to syncronize:
  // 1. Local undefined -> Simple insert with inserting firestore ids
  // 2. Local defined -> Sync with firestore ids

  if (championship === null) {
    return await syncBySimpleInsertWithTrackingIds(legacyChampionship, taskId);
  }
  return await syncWithPreparedTrackingIds(legacyChampionship, taskId);
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

async function syncBySimpleInsertWithTrackingIds(
  legacyCampionship: Awaited<ReturnType<typeof getFirestoreChampionshipById>>,
  taskId: string,
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
        firestoreId: r.id,
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        // Features are not implemented on legacy data
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
        firestoreId: m.id,
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
        firestoreId: p.id,
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

  taskProgressEventBus.emit({
    taskId,
    message: '... und jetzt noch die Tipps.',
  });

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
          firestoreId: legacyTip.id,
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

  return championship;
}

async function syncWithPreparedTrackingIds(
  legacyCampionship: Awaited<ReturnType<typeof getFirestoreChampionshipById>>,
  taskId: string,
) {
  const legacyData = await getLegacyStandings(legacyCampionship.id);
  const masterData = await getMasterData();

  // 1. Turnier muss aktualisiert werden weil mglweise Zusatztipps veröffentlicht wurden
  //    -> Theoretisch kann eine Regelwerk-Änderung passieren (plötzlich Doppelrunden, ...)
  //    -> Zum Testen erlaube ich auch Namensänderungen

  const ruleset = masterData.rulesets.find(
    (rs) => rs.slug === legacyCampionship.rulesId,
  );
  if (!ruleset) {
    throw new Error(`Unknown ruleset ${legacyCampionship.rulesId}`);
  }

  const championship = await db.championship.update({
    data: {
      name: legacyCampionship.name,
      extraPointsPublished: legacyCampionship.extraPointsPublished,
      rulesetId: ruleset.id,
      completed: legacyCampionship.completed,
      published: legacyCampionship.published,
    },
    where: {
      slug: legacyCampionship.id,
    },
  });

  // 2. Runden müssen aktualisiert werden
  for (const r of legacyData.legacyRounds) {
    const round = await db.round.upsert({
      create: {
        nr: r.nr,
        firestoreId: r.id,
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        // Features are not implemented on legacy data
        published: true,
        completed: true,
        tipsPublished: true,
      },
      update: {
        nr: r.nr,
        isDoubleRound: r.isDoubleRound,
        // Features are not implemented on legacy data
        published: true,
        completed: true,
        tipsPublished: true,
      },
      where: {
        firestoreId: r.id,
      },
    });
    r.entityId = round.id;
  }

  // 3. Spiele müssen aktualisiert werden (Datum, Ergebnis, ...)
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

    const match = await db.match.upsert({
      create: {
        nr: m.nr,
        firestoreId: m.id,
        result: m.result,
        points: m.points,
        championshipId: championship.id,
        roundId: round.entityId,
        ...optionalProps,
      },
      update: {
        nr: m.nr,
        result: m.result,
        points: m.points,
        ...optionalProps,
      },
      where: {
        firestoreId: m.id,
      },
    });

    m.entityId = match.id;
  }

  // 4. Spieler müssen aktualisiert werden (Punkte, ...)
  for (const p of legacyData.legacyPlayers) {
    const user = masterData.users.find((u) => u.slug === p.playerId);
    invariant(typeof user !== 'undefined');

    const player = await db.player.upsert({
      create: {
        firestoreId: p.id,
        points: p.points,
        extraPoints: p.extraPoints,
        totalPoints: p.totalPoints,
        rank: p.rank,
        userId: user.id,
        championshipId: championship.id,
      },
      update: {
        points: p.points,
        extraPoints: p.extraPoints,
        totalPoints: p.totalPoints,
        rank: p.rank,
      },
      where: {
        firestoreId: p.id,
      },
    });
    p.entityId = player.id;
  }

  taskProgressEventBus.emit({
    taskId,
    message: '... und jetzt noch die Tipps.',
  });

  // 5. Tipps müssen aktualisiert werden
  for (const p of legacyData.legacyPlayers) {
    const legacyPlayerTips = legacyData.legacyTips.filter(
      (lt) => lt.playerId === p.id,
    );

    for (const m of legacyData.legacyMatches) {
      const legacyTip = legacyPlayerTips.find((lt) => lt.matchId === m.id);
      if (!legacyTip) continue;

      await db.tip.upsert({
        create: {
          firestoreId: legacyTip.id,
          championshipId: championship.id,
          playerId: p.entityId,
          matchId: m.entityId,
          tip: legacyTip.tip,
          joker: legacyTip.joker || undefined,
          extraJoker: legacyTip.extraJoker || undefined,
          lonelyHit: legacyTip.lonelyHit || undefined,
          points: legacyTip.points,
        },
        update: {
          tip: legacyTip.tip,
          joker: legacyTip.joker || undefined,
          extraJoker: legacyTip.extraJoker || undefined,
          lonelyHit: legacyTip.lonelyHit || undefined,
          points: legacyTip.points,
        },
        where: {
          firestoreId: legacyTip.id,
        },
      });
    }
  }

  return championship;
}
