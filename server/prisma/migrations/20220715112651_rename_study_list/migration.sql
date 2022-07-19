/*
  Warnings:

  - You are about to drop the `StudyList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudyList" DROP CONSTRAINT "StudyList_userId_fkey";

-- DropTable
DROP TABLE "StudyList";

-- CreateTable
CREATE TABLE "UserStudy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStudy_link_key" ON "UserStudy"("link");

-- AddForeignKey
ALTER TABLE "UserStudy" ADD CONSTRAINT "UserStudy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
