/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Handle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Handle_handle_key" ON "Handle"("handle");
