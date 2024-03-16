-- DropForeignKey
ALTER TABLE "user_study_tags" DROP CONSTRAINT "user_study_tags_user_study_id_fkey";

-- AddForeignKey
ALTER TABLE "user_study_tags" ADD CONSTRAINT "user_study_tags_user_study_id_fkey" FOREIGN KEY ("user_study_id") REFERENCES "user_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
