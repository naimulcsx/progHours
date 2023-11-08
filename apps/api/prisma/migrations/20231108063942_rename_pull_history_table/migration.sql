/*
  Warnings:

  - The `status` column on the `pull_histories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RetrieveStatusEnum" AS ENUM ('PENDING', 'STARTED', 'PULLED', 'ERROR');

-- AlterTable
ALTER TABLE "pull_histories" DROP COLUMN "status",
ADD COLUMN     "status" "RetrieveStatusEnum" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "PullHistoryStatus";
