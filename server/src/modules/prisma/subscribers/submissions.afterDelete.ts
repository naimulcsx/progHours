import { Prisma } from "@prisma/client"

export const afterDelete = async (
  prisma,
  params: Prisma.MiddlewareParams,
  result: any
) => {
  if (params.model === "Submission") {
    if (params.action === "delete") {
      const userStat = await prisma.userStat.findUnique({
        where: { userId: result.userId },
      })
      const problem = await prisma.problem.findUnique({
        where: { id: result.problemId },
      })
      if (result.verdict === "AC") {
        userStat.totalSolved--
        userStat.totalSolveTime -= result.solveTime
        if (problem.difficulty > 0) {
          userStat.totalDifficulty -= problem.difficulty
          userStat.totalSolvedWithDifficulty--
        }
        await prisma.userStat.update({
          where: { userId: result.userId },
          data: userStat,
        })
      }
    }
  }
}
