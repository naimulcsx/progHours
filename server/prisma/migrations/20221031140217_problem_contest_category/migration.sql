-- CreateEnum
CREATE TYPE "ContestStatus" AS ENUM ('Upcoming', 'Running', 'Finished', 'Judging');

-- CreateEnum
CREATE TYPE "ContestMode" AS ENUM ('Invitation', 'Temporary', 'Private', 'Public');

-- CreateEnum
CREATE TYPE "StandingsMode" AS ENUM ('SimpleMode', 'PenaltyMode');

-- CreateEnum
CREATE TYPE "ProblemDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "checkerType" AS ENUM ('String', 'Float', 'Int', 'YesNo', 'Custom');

-- CreateEnum
CREATE TYPE "testType" AS ENUM ('Sample', 'Regular', 'Additional');

-- CreateEnum
CREATE TYPE "problemStatus" AS ENUM ('Locked', 'Free', 'Published');

-- CreateEnum
CREATE TYPE "judgeLanguage" AS ENUM ('CPP17', 'CPP20', 'Python', 'Java', 'Rust');

-- AlterEnum
ALTER TYPE "Verdict" ADD VALUE 'RE';

-- CreateTable
CREATE TABLE "JudgeContests" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "currentStatus" "ContestStatus" NOT NULL DEFAULT 'Upcoming',
    "contestMode" "ContestMode" NOT NULL DEFAULT 'Private',
    "standingsMode" "StandingsMode" NOT NULL DEFAULT 'PenaltyMode',
    "penalty" INTEGER NOT NULL DEFAULT 20,
    "contestPassword" TEXT,

    CONSTRAINT "JudgeContests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "categoryTitle" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeProblems" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cpuLimit" DOUBLE PRECISION NOT NULL DEFAULT 1000,
    "memoryLimit" INTEGER NOT NULL DEFAULT 256000,
    "problemStatement" TEXT,
    "inputStatement" TEXT,
    "outputStatement" TEXT,
    "noteStatement" TEXT,
    "inOutBaseFolder" TEXT NOT NULL,
    "totalInOutFiles" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "difficulty" "ProblemDifficulty",
    "checkerType" "checkerType" NOT NULL DEFAULT 'String',
    "fold" BOOLEAN NOT NULL DEFAULT false,
    "strictSpace" BOOLEAN NOT NULL DEFAULT false,
    "absolute" BOOLEAN NOT NULL DEFAULT false,
    "checkerPrecision" DOUBLE PRECISION NOT NULL DEFAULT 0.0001,
    "checkerCustomCode" TEXT,
    "type" "testType" NOT NULL DEFAULT 'Regular',
    "isPublishable" BOOLEAN NOT NULL DEFAULT false,
    "currentStatus" "problemStatus" NOT NULL DEFAULT 'Free',
    "contestId" INTEGER,
    "subCategoryId" INTEGER,
    "editorial" TEXT,

    CONSTRAINT "JudgeProblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeProblemTests" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "label" TEXT,
    "testFolder" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "JudgeProblemTests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeProblemSolutions" (
    "id" SERIAL NOT NULL,
    "label" TEXT,
    "language" "judgeLanguage" NOT NULL DEFAULT 'CPP17',
    "sourceCode" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "author" TEXT NOT NULL,

    CONSTRAINT "JudgeProblemSolutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeSubmissions" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "verdict" "Verdict" NOT NULL,
    "cpuTime" DOUBLE PRECISION NOT NULL,
    "memorySize" INTEGER NOT NULL,

    CONSTRAINT "JudgeSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JudgeContestsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JudgeProblemsToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "JudgeContests_id_idx" ON "JudgeContests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE INDEX "Category_id_title_idx" ON "Category"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_title_key" ON "SubCategory"("title");

-- CreateIndex
CREATE INDEX "SubCategory_id_idx" ON "SubCategory"("id");

-- CreateIndex
CREATE INDEX "JudgeProblems_id_idx" ON "JudgeProblems"("id");

-- CreateIndex
CREATE INDEX "JudgeProblemTests_weight_idx" ON "JudgeProblemTests"("weight");

-- CreateIndex
CREATE INDEX "JudgeProblemSolutions_id_idx" ON "JudgeProblemSolutions"("id");

-- CreateIndex
CREATE INDEX "JudgeSubmissions_id_idx" ON "JudgeSubmissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_JudgeContestsToUser_AB_unique" ON "_JudgeContestsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_JudgeContestsToUser_B_index" ON "_JudgeContestsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JudgeProblemsToTag_AB_unique" ON "_JudgeProblemsToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_JudgeProblemsToTag_B_index" ON "_JudgeProblemsToTag"("B");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProblems" ADD CONSTRAINT "JudgeProblems_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProblems" ADD CONSTRAINT "JudgeProblems_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "JudgeContests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProblems" ADD CONSTRAINT "JudgeProblems_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProblemTests" ADD CONSTRAINT "JudgeProblemTests_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "JudgeProblems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProblemSolutions" ADD CONSTRAINT "JudgeProblemSolutions_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeSubmissions" ADD CONSTRAINT "JudgeSubmissions_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeSubmissions" ADD CONSTRAINT "JudgeSubmissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "JudgeProblems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeContestsToUser" ADD CONSTRAINT "_JudgeContestsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "JudgeContests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeContestsToUser" ADD CONSTRAINT "_JudgeContestsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeProblemsToTag" ADD CONSTRAINT "_JudgeProblemsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "JudgeProblems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeProblemsToTag" ADD CONSTRAINT "_JudgeProblemsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
