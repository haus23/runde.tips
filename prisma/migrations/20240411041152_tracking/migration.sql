/*
  Warnings:

  - Added the required column `firestoreId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firestoreId` to the `Tip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firestoreId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firestoreId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firestoreId" TEXT NOT NULL,
    "nr" INTEGER NOT NULL,
    "isDoubleRound" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tipsPublished" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "championshipId" INTEGER NOT NULL,
    CONSTRAINT "Round_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("championshipId", "completed", "id", "isDoubleRound", "nr", "published", "tipsPublished") SELECT "championshipId", "completed", "id", "isDoubleRound", "nr", "published", "tipsPublished" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE UNIQUE INDEX "Round_firestoreId_key" ON "Round"("firestoreId");
CREATE TABLE "new_Tip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firestoreId" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "joker" BOOLEAN,
    "extraJoker" BOOLEAN,
    "lonelyHit" BOOLEAN,
    "points" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    CONSTRAINT "Tip_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tip_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tip_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tip" ("championshipId", "extraJoker", "id", "joker", "lonelyHit", "matchId", "playerId", "points", "tip") SELECT "championshipId", "extraJoker", "id", "joker", "lonelyHit", "matchId", "playerId", "points", "tip" FROM "Tip";
DROP TABLE "Tip";
ALTER TABLE "new_Tip" RENAME TO "Tip";
CREATE UNIQUE INDEX "Tip_firestoreId_key" ON "Tip"("firestoreId");
CREATE UNIQUE INDEX "Tip_playerId_matchId_key" ON "Tip"("playerId", "matchId");
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firestoreId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "extraPoints" DECIMAL NOT NULL DEFAULT 0,
    "totalPoints" DECIMAL NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Player_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("championshipId", "extraPoints", "id", "points", "rank", "totalPoints", "userId") SELECT "championshipId", "extraPoints", "id", "points", "rank", "totalPoints", "userId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_firestoreId_key" ON "Player"("firestoreId");
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firestoreId" TEXT NOT NULL,
    "nr" INTEGER NOT NULL,
    "date" TEXT,
    "result" TEXT NOT NULL DEFAULT '',
    "points" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "leagueId" INTEGER,
    "hometeamId" INTEGER,
    "awayteamId" INTEGER,
    CONSTRAINT "Match_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_hometeamId_fkey" FOREIGN KEY ("hometeamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_awayteamId_fkey" FOREIGN KEY ("awayteamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("awayteamId", "championshipId", "date", "hometeamId", "id", "leagueId", "nr", "points", "result", "roundId") SELECT "awayteamId", "championshipId", "date", "hometeamId", "id", "leagueId", "nr", "points", "result", "roundId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE UNIQUE INDEX "Match_firestoreId_key" ON "Match"("firestoreId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
