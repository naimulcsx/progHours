import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Submission } from "@/modules/submissions/submission.entity"
import { Repository } from "typeorm"
import { UsersService } from "../users/users.service"
import { Ranking } from "../ranking/ranking.entity"

@Injectable()
export class StatsService {
  constructor(
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
    const verdict_count = await this.getVerdictFrequency(userId)
    const total_solve_time = await this.getSolveTime(userId)
    const average_difficulty = await this.getAverageDifficulty(userId)
    return {
      verdict_count,
      total_solve_time,
      average_difficulty,
      total_solved: verdict_count.AC,
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
    const result = await this.submissionsRepository
      .createQueryBuilder("submission")
      .select(["submission.verdict", "COUNT(submission.verdict)"])
      .where("submission.user_id = :userId", { userId })
      .groupBy("submission.verdict")
      .execute()
    const freq = {
      AC: 0,
      WA: 0,
      TLE: 0,
      RTE: 0,
      MLE: 0,
    }
    result.forEach(
      ({ submission_verdict, count }) =>
        (freq[submission_verdict] = parseInt(count))
    )
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
    const { total_solve_time } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .select("SUM(submission.solve_time) as total_solve_time")
      .where("submission.user_id = :userId", { userId })
      .getRawOne()
    return total_solve_time ? parseInt(total_solve_time) : 0
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
    let { average_difficulty } = await this.submissionsRepository
      .createQueryBuilder("submission")
      .where("submission.user_id = :userId", { userId: userId })
      .andWhere("submission.verdict = 'AC'")
      .innerJoinAndSelect("submission.problem", "problem")
      .andWhere("problem.difficulty > 0")
      .select([
        "CAST(SUM(problem.difficulty) AS float) / COUNT(problem.difficulty) AS average_difficulty",
      ])
      .getRawOne()

    return average_difficulty ? parseFloat(average_difficulty) : 0
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
    return await this.rankRepository.find()
  }
}
