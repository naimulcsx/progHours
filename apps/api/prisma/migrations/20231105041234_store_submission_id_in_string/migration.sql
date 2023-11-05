/*
  Warnings:

  - The primary key for the `submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "submissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "submissions_id_seq";
