/*
  Warnings:

  - You are about to alter the column `extraPoints` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `totalPoints` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firestoreId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "extraPoints" REAL NOT NULL DEFAULT 0,
    "totalPoints" REAL NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Player_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("championshipId", "extraPoints", "firestoreId", "id", "points", "rank", "totalPoints", "userId") SELECT "championshipId", "extraPoints", "firestoreId", "id", "points", "rank", "totalPoints", "userId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_firestoreId_key" ON "Player"("firestoreId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
