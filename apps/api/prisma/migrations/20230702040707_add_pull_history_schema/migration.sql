-- CreateEnum
CREATE TYPE "HandleType" AS ENUM ('CODEFORCES', 'CODECHEF', 'SPOJ', 'ATCODER', 'GITHUB');

-- CreateEnum
CREATE TYPE "PullHistoryStatus" AS ENUM ('PENDING', 'STARTED', 'SUCCESS', 'ERROR');

-- CreateEnum
CREATE TYPE "PullHistoryItemStatus" AS ENUM ('PENDING', 'OK', 'ERROR');

-- CreateTable
CREATE TABLE "user_handles" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "HandleType" NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "user_handles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_histories" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "PullHistoryStatus" NOT NULL DEFAULT 'PENDING',
    "total_completed" INTEGER NOT NULL DEFAULT 0,
    "total_items" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pull_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_history_items" (
    "id" SERIAL NOT NULL,
    "problem_id" INTEGER NOT NULL,
    "status" "PullHistoryItemStatus" NOT NULL DEFAULT 'PENDING',
    "processing_time" INTEGER,
    "pull_history_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pull_history_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_handles" ADD CONSTRAINT "user_handles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_histories" ADD CONSTRAINT "pull_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_history_items" ADD CONSTRAINT "pull_history_items_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_history_items" ADD CONSTRAINT "pull_history_items_pull_history_id_fkey" FOREIGN KEY ("pull_history_id") REFERENCES "pull_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
