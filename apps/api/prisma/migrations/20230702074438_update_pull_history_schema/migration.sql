/*
  Warnings:

  - Made the column `processing_time` on table `pull_history_items` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pull_history_items" DROP CONSTRAINT "pull_history_items_pull_history_id_fkey";

-- AlterTable
ALTER TABLE "pull_histories" ADD COLUMN     "processing_time" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pull_history_items" ALTER COLUMN "processing_time" SET NOT NULL,
ALTER COLUMN "processing_time" SET DEFAULT 0,
ALTER COLUMN "processing_time" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE INDEX "pull_history_items_pull_history_id_idx" ON "pull_history_items"("pull_history_id");

-- AddForeignKey
ALTER TABLE "pull_history_items" ADD CONSTRAINT "pull_history_items_pull_history_id_fkey" FOREIGN KEY ("pull_history_id") REFERENCES "pull_histories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
