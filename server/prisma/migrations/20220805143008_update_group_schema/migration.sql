/*
  Warnings:

  - A unique constraint covering the columns `[hashtag]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('OWNER', 'MEMBER');

-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN     "role" "GroupRole" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_hashtag_key" ON "Group"("hashtag");

-- CreateIndex
CREATE INDEX "Group_accessCode_idx" ON "Group"("accessCode");
