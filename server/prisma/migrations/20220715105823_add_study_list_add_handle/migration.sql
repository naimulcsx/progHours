-- CreateTable
CREATE TABLE "StudyList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudyList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handle" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "onlineJudgeId" INTEGER NOT NULL,

    CONSTRAINT "Handle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyList_link_key" ON "StudyList"("link");

-- AddForeignKey
ALTER TABLE "StudyList" ADD CONSTRAINT "StudyList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handle" ADD CONSTRAINT "Handle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handle" ADD CONSTRAINT "Handle_onlineJudgeId_fkey" FOREIGN KEY ("onlineJudgeId") REFERENCES "OnlineJudge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
