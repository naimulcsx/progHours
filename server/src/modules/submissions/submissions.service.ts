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
import { Verdict } from "@prisma/client"

/**
 * Import Entities (models)
 */
import { Submission } from "@/modules/submissions/submission.entity"

/**
 * Import Services
 */
import { ParsersService } from "@/modules/parsers/parsers.service"
import getVjudgeCookie from "@/utils/getVjudgeCookie"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class SubmissionsService {
  constructor(
    private prisma: PrismaService,
    @Inject(ParsersService) private parsersService: ParsersService,
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getSubmissionsByUsername(username) {
    username = username.toLowerCase()
    const user = await this.prisma.user.findUnique({ where: { username } })
    if (!user) {
      throw new NotFoundException(["User not found"])
    }
    const submissions = await this.prisma.submission.findMany({
      where: { userId: user.id },
      orderBy: {
        solvedAt: "desc",
      },
      include: {
        problem: {
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    })
    return submissions
  }

  async createSubmission({
    link,
    verdict,
    solveTime,
    solvedAt,
    userId,
  }: {
    link: string
    verdict: Verdict
    solveTime: number
    solvedAt: Date
    userId: number
  }) {
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
    let foundProblem = await this.prisma.problem.findUnique({ where: { link } })

    if (foundProblem) problemId = foundProblem.id
    else {
      /**
       ** If the problem does not exist in the database
       ** then we need to parse it and save it in our database
       */
      try {
        const { name, pid, tags, difficulty, judge_id } =
          await this.parsersService.parseProblem(link)

        /** Save the problem */
        const newProblem = await this.prisma.problem.create({
          data: {
            name,
            pid,
            difficulty,
            link,
            onlineJudgeId: judge_id,
          },
        })

        /** Add the tags to the database */
        for (let tag of tags) {
          /** Find or create the tag */
          const tagObject = await this.prisma.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
          })

          /** Insert into the Juction Table */
          await this.prisma.problemTag.create({
            data: {
              problemId: newProblem.id,
              tagId: tagObject.id,
            },
          })
        }
        problemId = newProblem.id
      } catch (err) {
        throw new BadRequestException(err.message)
      }
    }

    /**
     ** Check if the same problem is added previously by the same user
     */
    try {
      const foundSubmission = await this.prisma.submission.findFirst({
        where: {
          userId,
          problemId,
        },
      })
      if (foundSubmission) {
        throw new BadRequestException("Submission already exists.")
      }
    } catch (err) {
      throw err
    }
    return this.prisma.submission.create({
      data: {
        solveTime,
        solvedAt,
        verdict,
        problemId,
        userId,
      },
    })
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
