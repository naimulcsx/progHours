import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as rp from "request-promise"
import { Cache } from "cache-manager"

/**
 * Import Entities (models)
 */
import { Submission } from "@/modules/submissions/submission.entity"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import { ParsersService } from "@/modules/parsers/parsers.service"
import { UsersService } from "@/modules/users/users.service"
import getVjudgeCookie from "@/utils/getVjudgeCookie"

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemsService: ProblemsService,
    @Inject(ParsersService) private parsersService: ParsersService,
    @Inject(UsersService) private usersService: UsersService,
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getSubmissions(userId) {
    const submissions = await this.submissionsRepository
      .createQueryBuilder("submissions")
      .where("submissions.user_id = :userId", { userId })
      .leftJoinAndSelect("submissions.problem", "problems")
      .leftJoinAndSelect("problems.tags", "tags")
      .leftJoinAndSelect("problems.user_problem_tags", "user_problem_tags")
      .leftJoinAndSelect("user_problem_tags.tag", "tag")
      .orderBy("submissions.solved_at", "DESC")
      .getMany()
    return submissions
  }

  async getSubmissionsByUsername(username) {
    const user = await this.usersService.getUser({ username })
    if (!user) {
      throw new NotFoundException(["User not found"])
    }
    const submissions = await this.getSubmissions(user.id)
    return {
      submissions,
    }
  }

  async createSubmission(body: any, user: any) {
    let { link } = body
    let problemId: number

    /**
     * Apply link transformers
     */
    try {
      link = await this.parsersService.unifyLink(link)
    } catch (err) {
      throw new BadRequestException(err)
    }
    /**
     * Check if the problem exists in database with the provided link
     */
    let foundProblem = await this.problemsService.getProblem(link)

    if (foundProblem) problemId = foundProblem.id
    else {
      /**
       ** If the problem does not exist in the database
       ** then we need to parse it and save it in our database
       */
      try {
        const problemData = await this.parsersService.parseProblem(link)
        const newProblem = await this.problemsService.createProblem({
          link,
          ...problemData,
        })
        problemId = newProblem.id
      } catch (err) {
        throw new BadRequestException([err.message])
      }
    }
    try {
      const foundSubmission = await this.submissionsRepository.findOne({
        problem_id: problemId,
        user_id: user.id,
      })
      if (foundSubmission) {
        /**
         ** If the same problem is added previously by the same user
         */
        throw new BadRequestException("Submission already exists.")
      }
    } catch (err) {
      throw err
    }
    const newSubmission = this.submissionsRepository.create({
      problem_id: problemId,
      user_id: user.id,
      ...body,
    })
    return this.submissionsRepository.save(newSubmission)
  }

  async updateSubmission(body: any, id: any) {
    const { verdict, solve_time, solved_at } = body

    const options: any = { id }

    if (verdict) options.verdict = verdict
    if (solve_time) options.solve_time = solve_time
    if (solved_at) options.solved_at = solved_at

    try {
      await this.submissionsRepository.update(id, options)

      return { message: "submission updated" }
    } catch (err) {
      throw err
    }
  }

  async deleteSubmission(id: any) {
    try {
      const submissionToDelete = await this.submissionsRepository.findOne({
        id,
      })
      await this.submissionsRepository.remove(submissionToDelete)
      return { message: "Submission deleted" }
    } catch (err) {
      throw err
    }
  }

  async loginIntoVjudgeContest(contest_id: string, password: string) {
    let cookie = await this.cacheManager.get("VJUDGE_COOKIE")!
    if (!cookie) {
      const cookieString = await getVjudgeCookie()
      await this.cacheManager.set("VJUDGE_COOKIE", cookieString, {
        ttl: parseInt(process.env.VJUDGE_COOKIE_TTL),
      })
      cookie = await this.cacheManager.get("VJUDGE_COOKIE")
    }
    const response = await rp({
      method: "POST",
      uri: `https://vjudge.net/contest/login/${contest_id}`,
      form: {
        password,
      },
      headers: {
        Cookie: cookie,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
      },
    })
    const contestLoginData = JSON.parse(response)
    if (contestLoginData.error) {
      throw {
        status: "error",
        error_code: 1004,
        message: contestLoginData.error,
      }
    }
    return { status: "success" }
  }
}
