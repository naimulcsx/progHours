-- DropIndex
DROP INDEX "Submission_userId_verdict_idx";

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE INDEX "Submission_solvedAt_idx" ON "Submission"("solvedAt");
