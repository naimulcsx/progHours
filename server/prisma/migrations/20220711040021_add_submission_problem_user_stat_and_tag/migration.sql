/*
  Warnings:

  - You are about to drop the column `statistics` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "statistics";

-- CreateTable
CREATE TABLE "UserStat" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalSolveTime" INTEGER NOT NULL DEFAULT 0,
    "totalDifficulty" INTEGER NOT NULL DEFAULT 0,
    "totalSolved" INTEGER NOT NULL DEFAULT 0,
    "totalSolvedWithDifficulty" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStat_userId_key" ON "UserStat"("userId");

-- AddForeignKey
ALTER TABLE "UserStat" ADD CONSTRAINT "UserStat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
