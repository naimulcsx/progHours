-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEMO', 'REGULAR', 'MENTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "HandleType" AS ENUM ('CODEFORCES', 'CODECHEF');

-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('AC', 'PS', 'WA', 'TLE', 'MLE', 'RE', 'CE', 'SK', 'OTH', 'HCK');

-- CreateEnum
CREATE TYPE "RetrieveStatusEnum" AS ENUM ('PENDING', 'STARTED', 'PULLED', 'ERROR');

-- CreateEnum
CREATE TYPE "StudyTypeEnum" AS ENUM ('ARTICLE', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "StudyDifficultyEnum" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "StudyLanguageEnum" AS ENUM ('BENGALI', 'ENGLISH', 'HINDI');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'REGULAR',
    "last_seen" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "institutionId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problems" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "metadata" JSONB DEFAULT '{}',

    CONSTRAINT "problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "problem_tags" (
    "problem_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "problem_tags_pkey" PRIMARY KEY ("problem_id","tag_id")
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "country" TEXT,
    "country_code" TEXT,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "solve_time" INTEGER NOT NULL,
    "verdict" "Verdict" NOT NULL,
    "solved_at" DATE NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "user_id" TEXT NOT NULL,
    "problem_id" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "ac_count" INTEGER NOT NULL DEFAULT 0,
    "ps_count" INTEGER NOT NULL DEFAULT 0,
    "wa_count" INTEGER NOT NULL DEFAULT 0,
    "tle_count" INTEGER NOT NULL DEFAULT 0,
    "mle_count" INTEGER NOT NULL DEFAULT 0,
    "re_count" INTEGER NOT NULL DEFAULT 0,
    "ce_count" INTEGER NOT NULL DEFAULT 0,
    "sk_count" INTEGER NOT NULL DEFAULT 0,
    "hck_count" INTEGER NOT NULL DEFAULT 0,
    "oth_count" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB DEFAULT '{}',

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_handles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "HandleType" NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "user_handles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_histories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "RetrieveStatusEnum" NOT NULL DEFAULT 'PENDING',
    "total_completed" INTEGER NOT NULL DEFAULT 0,
    "total_items" INTEGER NOT NULL DEFAULT 0,
    "items" JSONB DEFAULT '[]',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "processing_time" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "pull_histories_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "problems_pid_key" ON "problems"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "problems_url_key" ON "problems"("url");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "submissions_solved_at_idx" ON "submissions"("solved_at");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_user_id_problem_id_key" ON "submissions"("user_id", "problem_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_handles_user_id_type_key" ON "user_handles"("user_id", "type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_fkey" FOREIGN KEY ("problem_id") REFERENCES "problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_handles" ADD CONSTRAINT "user_handles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_histories" ADD CONSTRAINT "pull_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_studies" ADD CONSTRAINT "user_studies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_study_tags" ADD CONSTRAINT "user_study_tags_user_study_id_fkey" FOREIGN KEY ("user_study_id") REFERENCES "user_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_study_tags" ADD CONSTRAINT "user_study_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
