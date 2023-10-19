-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Verdict" ADD VALUE 'PS';
ALTER TYPE "Verdict" ADD VALUE 'MLE';
ALTER TYPE "Verdict" ADD VALUE 'RE';
ALTER TYPE "Verdict" ADD VALUE 'CE';
ALTER TYPE "Verdict" ADD VALUE 'SK';
ALTER TYPE "Verdict" ADD VALUE 'OTH';

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "ac_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ce_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mle_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "oth_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ps_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "re_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sk_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tle_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wa_count" INTEGER NOT NULL DEFAULT 0;
