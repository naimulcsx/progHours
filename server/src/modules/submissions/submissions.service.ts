import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import convertLinkToOriginal from "@/utils/converLinkToOriginal"
import getUniformCFLink from "@/utils/getUniformCFLink"
import getUniformCCLink from "@/utils/getUniformCCLink"

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
import { UsersService } from "@/modules/users/users.service"
import getUniformTimusLink from "@/utils/getUniformTimusLink"

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(ProblemsService) private problemsService: ProblemsService,
    @Inject(ParsersService) private parsersService: ParsersService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService,
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

    const url = new URL(link)
    const { hostname, protocol } = url

    /**
     * Remove all query params from the link
     *  - except a few online judge which uses query params as problem links eg. uva, timus etc
     */
    const params = []
    let excludeOJParams = {
      "onlinejudge.org": ["option", "Itemid", "category", "page", "problem"],
      "acm.timus.ru": ["space", "num"],
    }
    for (let param of url.searchParams.entries()) params.push(param)
    params.forEach(([key]) => {
      let match: boolean
      Object.keys(excludeOJParams).forEach((oj) => {
        if (hostname === oj) {
          match = true
          if (!excludeOJParams[oj].includes(key)) {
            url.searchParams.delete(key)
          }
        }
      })
      if (!match) url.searchParams.delete(key)
    })
    link = url.toString()
    console.log("link ", link)

    /**
     * Convert link to https protocol
     */
    if (protocol === "http:") link = `https:` + link.substring(5)

    /**
     * Link Transformer
     *
     * Changing the Links to the respective OJ link
     * Why?- To remove duplicated entries for the same problem
     * For example
     *    https://codeforces.com/problemset/problem/1617/B
     *    https://vjudge.net/problem/CodeForces-1617B
     */
    const linkConverters = {
      "vjudge.net": convertLinkToOriginal,
      "codeforces.com": getUniformCFLink,
      "www.codechef.com": getUniformCCLink,
      "acm.timus.ru": getUniformTimusLink,
    }
    if (linkConverters[hostname]) link = linkConverters[hostname](link)

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
}
