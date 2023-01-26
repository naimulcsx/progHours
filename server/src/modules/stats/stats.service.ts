import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { UserStat } from "@prisma/client"

// fix prisma bigint issue: https://github.com/prisma/studio/issues/614
const bigIntPrototype = BigInt.prototype as any
bigIntPrototype.toJSON = function () {
  return Number(this)
}

export interface UserStatWithComputedFields extends UserStat {
  rank: number
  averageDifficulty: number
  score: number
}

export function computeRankAndSort(stats: UserStat[]): UserStatWithComputedFields[] {
  return stats
    .map((item: UserStatWithComputedFields) => {
      item.averageDifficulty = item.totalDifficulty / item.totalSolvedWithDifficulty || 0
      item.score = (item.totalSolved * item.averageDifficulty) / 100 + item.totalSolveTime
      if (!item.score) item.score = 0
      item.score = Math.round(item.score * 1e2) / 1e2
      item.averageDifficulty = Math.round(item.averageDifficulty * 1e2) / 1e2
      return item
    })
    .sort((a, b) => b.score - a.score)
    .map((item, idx) => {
      item.rank = idx + 1
      return item
    })
}

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Uses all of the other helper methods and return all the statistics
   */
  async getUserStats(userId) {
    const verdictCount = await this.getVerdictFrequency(userId)
    const userStat = await this.prisma.userStat.findUnique({
      where: { userId },
    })
    const tagsFrequency = await this.getTagsFrequency(userId)
    const tagsSolveTime = await this.getTagSolveTime(userId)
    // const heatmapData = await this.getHeatmapData(userId)
    return {
      verdictCount,
      totalSolved: userStat.totalSolved,
      totalDifficulty: userStat.totalDifficulty,
      totalSolveTime: userStat.totalSolveTime,
      totalSolvedWithDifficulty: userStat.totalSolvedWithDifficulty,
      tagsFrequency,
      tagsSolveTime,
    }
  }

  async getHeatmapData(userId) {
    const rawData = await this.prisma.$queryRaw`
      SELECT 
        CAST("Submission"."solvedAt" AS DATE),  
        COUNT("Submission"."solveTime")
      FROM 
        "Submission"
      WHERE
        "Submission"."userId" = 97
      GROUP BY CAST("Submission"."solvedAt" AS DATE)
    `
    return rawData
  }

  /**
   * Returns the frequency of submissions based on verdict for an user
   */
  async getVerdictFrequency(userId) {
    /* -------------- SQL Query ----------------
      SELECT 
        "submission"."verdict" AS "submission_verdict", 
        COUNT("submission"."verdict") 
      FROM 
        "submissions" "submission" 
      WHERE 
        "submission"."user_id" = : userId 
      GROUP BY 
        "submission"."verdict"
    */
    const result = await this.prisma.submission.groupBy({
      by: ["verdict"],
      where: { userId },
      _count: {
        verdict: true,
      },
    })
    const freq = {}
    result.forEach(({ verdict, _count }) => (freq[verdict] = _count.verdict))
    return freq
  }

  /**
   * Returns the total solve_time based for an user
   */
  async getSolveTime(userId) {
    /* -------------- SQL Query ----------------
      SELECT 
        SUM("submission"."solve_time") 
      FROM 
        "submissions" "submission" 
      WHERE 
        "submission"."user_id" = : userId
    */
    const {
      _sum: { solveTime },
    } = await this.prisma.submission.aggregate({
      where: { userId },
      _sum: { solveTime: true },
    })
    return solveTime
  }

  /**
   * Returns the average difficulty for an user
   */
  async getAverageDifficulty(userId) {
    /*-------------- SQL Query ----------------
      SELECT 
        CAST(
          SUM("problem"."difficulty") AS float
        ) / COUNT("problem"."difficulty") AS average_difficulty 
      FROM 
        "submissions" "submission" 
        INNER JOIN "problems" "problem" ON "problem"."id" = "submission"."problem_id" 
      WHERE 
        "submission"."user_id" = : userId 
        AND "submission"."verdict" = 'AC' 
        AND "problem"."difficulty" > 0
    */
    return 0
  }

  /**
   * Get user ranklist
   */
  async getRankList() {
    const ranklist = await this.prisma.userStat.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            batch: true,
            department: true,
          },
        },
      },
    })
    return computeRankAndSort(ranklist)
  }

  /**
   * Get tags frequency
   */
  async getTagsFrequency(userId) {
    const rawData = await this.prisma.$queryRaw`
      SELECT 
        "Tag"."name", 
        CAST(COUNT("Tag"."name") AS int)
      FROM 
        "ProblemTag"
      LEFT JOIN "Tag" ON "ProblemTag"."tagId" = "Tag"."id"
      WHERE 
        "ProblemTag"."problemId" IN (
          SELECT 
            "Problem"."id"
          FROM 
            "Submission" 
            LEFT JOIN "Problem" ON "Problem"."id" = "Submission"."problemId" 
          WHERE 
            "Submission"."userId" = ${userId}
            AND "Submission"."verdict" = 'AC'
        ) 
      GROUP BY 
        "Tag"."name"
    `
    return rawData
  }

  async getTagSolveTime(userId) {
    const rawData: any[] = await this.prisma.$queryRaw`
      SELECT 
        "Tag"."name",
        CAST(SUM("Submission"."solveTime") as int),
        COUNT("Submission"."id")
      FROM 
        "Submission"
      LEFT JOIN "Problem" ON "Submission"."problemId" = "Problem"."id"
      LEFT JOIN "ProblemTag" ON "Problem"."id" = "ProblemTag"."problemId"
      LEFT JOIN "Tag" ON "ProblemTag"."tagId" = "Tag"."id"
      WHERE 
        "Submission"."userId" = ${userId}
        AND "Submission"."verdict" = 'AC'
      GROUP BY
        "Tag"."name"
    `

    console.log(rawData)
    return rawData.map((item) => {
      if (!item.name) return { name: "untagged", sum: item.sum, count: item.count }
      return item
    })
  }

  async getWeeklyLeaderboard(fromDate: string, toDate: string) {
    const result: any = await this.prisma.$queryRaw`
      SELECT 
        "User"."id", 
        "User".name, 
        "User".username,
        "User".batch,
        SUM("Submission"."solveTime") AS "totalSolveTime", 
        SUM("Problem".difficulty) AS "totalDifficulty",
        COUNT("Problem".id) AS "totalSolved",
        COUNT(case when "Problem"."difficulty" > 0 then 1 else null end) AS "totalSolvedWithDifficulty"
      FROM 
        "Submission" 
        LEFT JOIN "Problem" ON "Submission"."problemId" = "Problem"."id" 
        LEFT JOIN "User" ON "User"."id" = "Submission"."userId" 
      WHERE 
        "Submission".verdict = 'AC' 
        AND "Submission"."solvedAt" >= TO_TIMESTAMP(${fromDate}, 'YYYY-MM-DD') 
        AND "Submission"."solvedAt" < TO_TIMESTAMP(${toDate}, 'YYYY-MM-DD')
      GROUP BY 
        "User"."id"
      `

    const data = result.map((stat: any) => {
      return {
        id: Number(stat.id),
        totalSolveTime: Number(stat.totalSolveTime),
        totalDifficulty: Number(stat.totalDifficulty),
        totalSolved: Number(stat.totalSolved),
        totalSolvedWithDifficulty: Number(stat.totalSolvedWithDifficulty),
        user: {
          id: Number(stat.id),
          name: stat.name,
          username: stat.username,
          batch: Number(stat.batch),
        },
      }
    })

    return computeRankAndSort(data)
  }

  async getGroupLeaderboard(groupSlug: string, fromDate: string, toDate: string) {
    const group = await this.prisma.group.findUnique({ where: { slug: groupSlug } })

    const result: any = await this.prisma.$queryRaw`
      SELECT 
        "User"."id", 
        "User".name, 
        "User".username,
        "User".batch,
        SUM("Submission"."solveTime") AS "totalSolveTime", 
        SUM("Problem".difficulty) AS "totalDifficulty",
        COUNT("Problem".id) AS "totalSolved",
        COUNT(case when "Problem"."difficulty" > 0 then 1 else null end) AS "totalSolvedWithDifficulty"
      FROM
        "Submission" 
        LEFT JOIN "Problem" ON "Submission"."problemId" = "Problem"."id" 
        LEFT JOIN "User" ON "User"."id" = "Submission"."userId" 
      WHERE 
        "Submission".verdict = 'AC' 
        AND "Submission"."solvedAt" >= TO_TIMESTAMP(${fromDate}, 'YYYY-MM-DD') 
        AND "Submission"."solvedAt" < TO_TIMESTAMP(${toDate}, 'YYYY-MM-DD')
        AND "User"."id" IN (SELECT "UserGroup"."userId" FROM "UserGroup" WHERE "UserGroup"."groupId" = ${group?.id})
      GROUP BY 
        "User"."id"
      `

    const data = result.map((stat: any) => {
      return {
        id: Number(stat.id),
        totalSolveTime: Number(stat.totalSolveTime),
        totalDifficulty: Number(stat.totalDifficulty),
        totalSolved: Number(stat.totalSolved),
        totalSolvedWithDifficulty: Number(stat.totalSolvedWithDifficulty),
        user: {
          id: Number(stat.id),
          name: stat.name,
          username: stat.username,
          batch: Number(stat.batch),
        },
      }
    })

    return computeRankAndSort(data)
  }

  async getProgress(userId: number, fromDate: string, toDate: string) {
    const result: any = await this.prisma.$queryRaw`
      SELECT 
        date("Submission"."solvedAt"), 
        COUNT("Problem".id) AS "totalSolved",
        SUM("Submission"."solveTime") AS "totalSolveTime", 
        SUM("Problem".difficulty) AS "totalDifficulty",
        COUNT(case when "Problem"."difficulty" > 0 then 1 else null end) AS "totalSolvedWithDifficulty"
      FROM
        "Submission" 
        LEFT JOIN "Problem" ON "Submission"."problemId" = "Problem"."id" 
      WHERE 
        "Submission"."userId" = ${userId}
        AND "Submission".verdict = 'AC'
        AND "Submission"."solvedAt" >= TO_TIMESTAMP(${fromDate}, 'YYYY-MM-DD')  
        AND "Submission"."solvedAt" < TO_TIMESTAMP(${toDate}, 'YYYY-MM-DD')
      GROUP BY 
        date("Submission"."solvedAt");
      `

    return result
  }

  async getGroupProgress(groupSlug: string, fromDate: string, toDate: string) {
    const group = await this.prisma.group.findUnique({ where: { slug: groupSlug } })
    const groupUsers = await this.prisma.userGroup.findMany({
      where: { groupId: group.id },
      include: { user: true },
    })

    let result: any = {}
    for (let i = 0; i < groupUsers.length; ++i) {
      if (groupUsers[i].role !== "ADMIN") {
        const val = await this.getProgress(groupUsers[i].userId, fromDate, toDate)
        result[groupUsers[i].user.username] = val
      }
    }

    return result
  }
}
