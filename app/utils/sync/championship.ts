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

  // Three ways to syncronize:
  // 1. Remote complete, local undefined -> Simple insert
  // 2. Remote uncomplete, local undefined -> Simple insert with preparing sync helper data
  // 3. Remote uncomplete, local defined -> Sync with helper data
  // 4. Remote complete, local defined -> Last sync with helper data and delete helper data

  if (championship === null) {
    if (legacyChampionship.completed) {
      return await syncBySimpleInsert(legacyChampionship, taskId);
    }
    return await syncByPrepareTrackingData(legacyChampionship, taskId);
  }

  if (!legacyChampionship.completed) {
    return await syncWithPreparedTrackingData(legacyChampionship, taskId);
  }

  throw new Error(
    'Fehler: Diese Art des Abgleichs ist noch nicht implementiert',
  );
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

async function syncByPrepareTrackingData(
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
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        published: true,
        completed: true,
        tipsPublished: true,
      },
    });
    r.entityId = round.id;
    await db.firestoreMapping.create({
      data: { firebaseId: r.id, sqliteId: round.id },
    });
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
    await db.firestoreMapping.create({
      data: { firebaseId: m.id, sqliteId: match.id },
    });
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
    await db.firestoreMapping.create({
      data: { firebaseId: p.id, sqliteId: player.id },
    });
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

      const tip = await db.tip.create({
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
      await db.firestoreMapping.create({
        data: { firebaseId: legacyTip.id, sqliteId: tip.id },
      });
    }
  }

  return championship;
}

async function syncWithPreparedTrackingData(
  legacyCampionship: Awaited<ReturnType<typeof getFirestoreChampionshipById>>,
  taskId: string,
) {
  const legacyData = await getLegacyStandings(legacyCampionship.id);
  const masterData = await getMasterData();

  // 1. Turnier muss aktualisiert werden weil mglweise Zusatztipps veröffentlicht wurden
  //    -> Theoretisch kann eine Regelwerk-Änderung passieren (plötzlich Doppelrunden, ...)
  //    -> Zum Testen erlaube ich auch Namensänderungen
  //    -> Neues Turnier kann über den Slug gefunden werden

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
    },
    where: {
      slug: legacyCampionship.id,
    },
  });

  // 2. Runden müssen aktualisiert werden (neue Runde!)
  //    -> Runde könnte gefunden werden über Turnier-ID und Runden-Nr
  //    -> Ich werde aber in der Mapping-Tabelle einen Eintrag machen

  // Extract rounds
  for (const r of legacyData.legacyRounds) {
    // Find id
    const { sqliteId } = await db.firestoreMapping.findFirstOrThrow({
      where: { firebaseId: r.id },
    });
    const round = await db.round.upsert({
      create: {
        nr: r.nr,
        isDoubleRound: r.isDoubleRound,
        championshipId: championship.id,
        published: true,
        completed: true,
        tipsPublished: true,
      },
      update: {
        nr: r.nr,
        isDoubleRound: r.isDoubleRound,
      },
      where: {
        id: sqliteId,
      },
    });
    r.entityId = round.id;
  }

  // 3. Spiele müssen aktualisiert werden (Datum, Ergebnis, ...)
  //    -> Spiel könnte gefunden werden über Turnier-ID und Spiel-Nr
  //    -> Ich werde aber in der Mapping-Tabelle einen Eintrag machen
  // 4. Spieler müssen aktualisiert werden (Punkte, ...)
  //    -> Spieler könnte gefunden werden über Turnier-ID und Spieler-Slugr
  //    -> Ich werde aber in der Mapping-Tabelle einen Eintrag machen
  // 5. Tipps müssen aktualisiert werden
  //    -> Hier muss die Mapping-Tabelle benutzt werden
  //    -> Achtung: nachträglich hinzugefügte Tipps müssen erfasst werden (upsert?)

  return championship;
}
