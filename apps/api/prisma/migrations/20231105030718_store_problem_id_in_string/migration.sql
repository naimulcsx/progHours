/*
  Warnings:

  - The primary key for the `problem_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `problems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "problem_tags" DROP CONSTRAINT "problem_tags_problem_id_fkey";

-- DropForeignKey
ALTER TABLE "pull_histories" DROP CONSTRAINT "pull_histories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pull_history_items" DROP CONSTRAINT "pull_history_items_problem_id_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_problem_id_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_handles" DROP CONSTRAINT "user_handles_user_id_fkey";

-- AlterTable
ALTER TABLE "problem_tags" DROP CONSTRAINT "problem_tags_pkey",
ALTER COLUMN "problem_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "problem_tags_pkey" PRIMARY KEY ("problem_id", "tag_id");

-- AlterTable
ALTER TABLE "problems" DROP CONSTRAINT "problems_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "problems_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "problems_id_seq";

-- AlterTable
ALTER TABLE "pull_histories" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "pull_history_items" ALTER COLUMN "problem_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "submissions" ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "problem_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_handles" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "full_name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_handles" ADD CONSTRAINT "user_handles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_histories" ADD CONSTRAINT "pull_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_history_items" ADD CONSTRAINT "pull_history_items_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
