/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Handle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studyDate` to the `UserStudy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studyTime` to the `UserStudy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStudy" ADD COLUMN     "studyDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "studyTime" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Handle_handle_key" ON "Handle"("handle");
