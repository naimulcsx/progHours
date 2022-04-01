import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

/**
 * Import Entities (models)
 */
import { Submission } from "@/modules/submissions/submission.entity"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"
import { ParsersService } from "@/modules/parsers/parsers.service"
import { AuthService } from "@/modules/auth/auth.service"

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemsService: ProblemsService,
    @Inject(ParsersService) private parsersService: ParsersService,
    @Inject(AuthService) private authService: AuthService,
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>
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

  vjudgeToCF(link) {
    const linkUrl = new URL(link)
    const problem = linkUrl.pathname.includes("CodeForces")
      ? linkUrl.pathname.split("CodeForces-").pop()
      : linkUrl.pathname.split("Gym-").pop()
    const contestId = problem.substring(0, problem.length - 1)
    const problemId = problem.substring(problem.length - 1)
    const newLink = linkUrl.pathname.includes("CodeForces")
      ? `https://codeforces.com/contest/${contestId}/problem/${problemId}`
      : `https://codeforces.com/gym/${contestId}/problem/${problemId}`
    return newLink
  }

  vjudgeToLightOJ(link) {
    const problemId = link.split("LightOJ-").pop()
    const newLink = `https://lightoj.com/problem/${problemId}`
    return newLink
  }

  convertLinkToOriginal(link) {
    if (link.includes("CodeForces") || link.includes("Gym"))
      return this.vjudgeToCF(link)
    else if (link.includes("LightOJ")) return this.vjudgeToLightOJ(link)
    return link
  }

  async createSubmission(body: any, user: any) {
    let { link } = body
    let problemId: number

    if (new URL(link).hostname === "vjudge.net")
      link = this.convertLinkToOriginal(link)

    console.log(link)

    /**
     * If vjudge cf - then convert link to cf link
     */

    const foundProblem = await this.problemsService.getProblem(link)
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
        problem: problemId,
        user: user.id,
      })
      if (foundSubmission) {
        /**
         ** If the same problem is added previously by the same user
         */
        throw new BadRequestException("you have already added this problem")
      }
    } catch (err) {
      throw err
    }
    const newSubmission = this.submissionsRepository.create({
      problem: problemId,
      user: user.id,
      ...body,
    })
    return this.submissionsRepository.save(newSubmission)
  }

  async updateSubmission(body: any, id: any) {
    const { verdict, solve_time, solved_at } = body

    const options: any = {}

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
      await this.submissionsRepository.delete(id)

      return { message: "Submission deleted" }
    } catch (err) {
      throw err
    }
  }
}
