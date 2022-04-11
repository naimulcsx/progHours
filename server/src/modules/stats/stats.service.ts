import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Submission } from "@/modules/submissions/submission.entity"
import { Repository } from "typeorm"

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>
  ) {}

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

    return average_difficulty ? parseInt(average_difficulty) : 0
  }
}
