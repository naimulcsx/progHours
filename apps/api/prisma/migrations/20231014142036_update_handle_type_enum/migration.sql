/*
  Warnings:

  - The values [SPOJ,ATCODER,GITHUB] on the enum `HandleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HandleType_new" AS ENUM ('CODEFORCES', 'CODECHEF');
ALTER TABLE "user_handles" ALTER COLUMN "type" TYPE "HandleType_new" USING ("type"::text::"HandleType_new");
ALTER TYPE "HandleType" RENAME TO "HandleType_old";
ALTER TYPE "HandleType_new" RENAME TO "HandleType";
DROP TYPE "HandleType_old";
COMMIT;
