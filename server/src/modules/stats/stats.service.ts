import { Injectable } from "@nestjs/common"
import { InjectConnection, InjectRepository } from "@nestjs/typeorm"
import { Submission } from "@/modules/submissions/submission.entity"
import { Connection, Repository } from "typeorm"
import { UsersService } from "../users/users.service"
import { Ranking } from "../ranking/ranking.entity"
import { PrismaService } from "../prisma/prisma.service"
import { stat } from "fs"

@Injectable()
export class StatsService {
  constructor(
    private prisma: PrismaService,
    @InjectConnection() private readonly connection: Connection,

    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    private readonly usersService: UsersService,

    @InjectRepository(Ranking)
    private rankRepository: Repository<Ranking>
  ) {}

  /**
   * Uses all of the other helper methods and return all the statistics
   */
  async getUserStats(userId) {
    const verdictCount = await this.getVerdictFrequency(userId)
    const userStat = await this.prisma.userStat.findUnique({
      where: { userId },
    })
    const tagsFrequency = await this.getTagsFrequency(userId)
    return {
      verdictCount,
      totalSolved: userStat.totalSolved,
      totalDifficulty: userStat.totalDifficulty,
      totalSolveTime: userStat.totalSolveTime,
      totalSolvedWithDifficulty: userStat.totalSolvedWithDifficulty,
      tagsFrequency,
    }
  }

  /**
   * Returns the number of total solved problems by a particular user
   */
  async getTotalSolvedCount(userId) {
    /* -------------- SQL Query ----------------
      SELECT 
        COUNT("submission"."verdict") 
      FROM 
        "submissions" "submission" 
      WHERE 
        "submission"."verdict" = 'AC' 
        AND "submission"."user_id" = : userId
  */
    const { count } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .where("submission.verdict = 'AC'")
      .andWhere("submission.user_id = :userId", { userId })
      .select("COUNT(submission.verdict)")
      .getRawOne()
    return count ? parseInt(count) : 0
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
   * Get user live ranklist
   */
  async getLiveRanklist() {
    const users = await this.usersService
      .createQueryBuilder("user")
      .select(["user.username", "user.name", "user.id"])
      .getMany()
    const result = []
    for (let user of users) {
      const average_difficulty = await this.getAverageDifficulty(user.id)
      const total_solve_time = await this.getSolveTime(user.id)
      const total_solved = await this.getTotalSolvedCount(user.id)
      result.push({
        ...user,
        average_difficulty,
        total_solve_time,
        total_solved,
      })
    }
    return result
  }

  /**
   * Get user ranklist
   */
  async getRankList() {
    return this.prisma.userStat.findMany({
      include: { user: true },
    })
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
}
