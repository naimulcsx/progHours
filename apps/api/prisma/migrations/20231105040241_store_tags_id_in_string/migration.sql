/*
  Warnings:

  - The primary key for the `problem_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "problem_tags" DROP CONSTRAINT "problem_tags_tag_id_fkey";

-- AlterTable
ALTER TABLE "problem_tags" DROP CONSTRAINT "problem_tags_pkey",
ALTER COLUMN "tag_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "problem_tags_pkey" PRIMARY KEY ("problem_id", "tag_id");

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tags_id_seq";

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
