/*
  Warnings:

  - You are about to drop the column `link` on the `problems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `problems` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `problems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "problem_tags" DROP CONSTRAINT "problem_tags_problem_id_fkey";

-- DropIndex
DROP INDEX "problems_link_key";

-- AlterTable
ALTER TABLE "problems" DROP COLUMN "link",
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "problems_url_key" ON "problems"("url");

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
