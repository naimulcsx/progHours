import { Prisma } from "@prisma/client"

export const afterCreate = async (
  prisma,
  params: Prisma.MiddlewareParams,
  result: any
) => {
  if (params.model === "Submission") {
    // Submission is created
    if (params.action === "create") {
      const userStat = await prisma.userStat.findUnique({
        where: { userId: params.args.data.userId },
      })
      const problem = await prisma.problem.findUnique({
        where: { id: params.args.data.problemId },
      })
      if (params.args.data.verdict === "AC") {
        userStat.totalSolved++
        userStat.totalSolveTime += params.args.data.solveTime
        if (problem.difficulty > 0) {
          userStat.totalDifficulty += problem.difficulty
          userStat.totalSolvedWithDifficulty++
        }
      }
      await prisma.userStat.update({
        where: { userId: params.args.data.userId },
        data: userStat,
      })
    }
  }
}
