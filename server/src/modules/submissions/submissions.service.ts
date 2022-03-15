import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AuthService } from "../auth/auth.service"
import { ParsersService } from "../parsers/parsers.service"
import { ProblemsService } from "../problems/problems.service"
import { Submission } from "./submission.entity"

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

  async createSubmission(body: any, user: any) {
    const { link } = body
    let problemId: number
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
        throw new BadRequestException(["some error occured"])
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
