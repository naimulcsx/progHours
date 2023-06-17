/*
  Warnings:

  - A unique constraint covering the columns `[user_id,problem_id]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "submissions_problem_id_idx";

-- DropIndex
DROP INDEX "submissions_user_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "submissions_user_id_problem_id_key" ON "submissions"("user_id", "problem_id");
