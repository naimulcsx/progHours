-- AlterTable
ALTER TABLE "ListProblem" ADD COLUMN     "collectionId" INTEGER;

-- AddForeignKey
ALTER TABLE "ListProblem" ADD CONSTRAINT "ListProblem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
