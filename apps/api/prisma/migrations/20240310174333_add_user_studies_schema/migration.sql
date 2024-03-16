-- CreateEnum
CREATE TYPE "StudyTypeEnum" AS ENUM ('ARTICLE', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "StudyDifficultyEnum" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "StudyLanguageEnum" AS ENUM ('BENGALI', 'ENGLISH', 'HINDI');

-- CreateTable
CREATE TABLE "user_studies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "resource_link" TEXT NOT NULL,
    "type" "StudyTypeEnum" NOT NULL,
    "difficulty" "StudyDifficultyEnum" NOT NULL,
    "language" "StudyLanguageEnum" NOT NULL,
    "duration" INTEGER NOT NULL,
    "study_date" DATE NOT NULL,
    "notes" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_study_tags" (
    "user_study_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "user_study_tags_pkey" PRIMARY KEY ("user_study_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "user_studies" ADD CONSTRAINT "user_studies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_study_tags" ADD CONSTRAINT "user_study_tags_user_study_id_fkey" FOREIGN KEY ("user_study_id") REFERENCES "user_studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_study_tags" ADD CONSTRAINT "user_study_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
