/*
  Warnings:

  - You are about to drop the `Feeding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HusbandryRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reptile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Feeding";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HusbandryRecord";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reptile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Schedule";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "VinylRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "label" TEXT,
    "genre" TEXT,
    "pressingCountry" TEXT,
    "coverArtUrl" TEXT,
    "mediaGrade" TEXT NOT NULL,
    "sleeveGrade" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OWNED',
    "isCleaned" BOOLEAN NOT NULL DEFAULT false,
    "hasAntiStaticSleeve" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VinylRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vinylRecordId" INTEGER NOT NULL,
    "playedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlayLog_vinylRecordId_fkey" FOREIGN KEY ("vinylRecordId") REFERENCES "VinylRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isPublicProfile" BOOLEAN NOT NULL DEFAULT false,
    "bio" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "passwordHash", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "passwordHash", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
