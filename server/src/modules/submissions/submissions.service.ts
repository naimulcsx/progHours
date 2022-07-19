import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import * as rp from "request-promise"
import { Cache } from "cache-manager"
import { Verdict } from "@prisma/client"

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
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getSubmissionsByUsername(username) {
    // Find the user in the database
    const user = await this.prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    })
    // If the user doesn't exist in our app
    if (!user) {
      throw new NotFoundException(["User not found"])
    }
    // Otherwise find the submissions by that particular user
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
    // and return the submissions
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
    // apply link transformers
    try {
      link = await this.parsersService.unifyLink(link)
    } catch (err) {
      throw new BadRequestException(err)
    }
    // Check if the problem exists in database with the provided link
    let foundProblem = await this.prisma.problem.findUnique({ where: { link } })

    if (foundProblem) problemId = foundProblem.id
    else {
      // If the problem does not exist in the database
      // then we need to parse it by making a network request
      // and then save it in our database
      try {
        // parse the problem with the help of parser service
        const problem = await this.parsersService.parseProblem(link)

        const { name, pid, tags, difficulty, judge_id } = problem

        console.log(problem)

        // save the problem that we've parsed
        const newProblem = await this.prisma.problem.create({
          data: {
            name,
            pid,
            difficulty,
            link,
            onlineJudgeId: judge_id,
          },
        })

        // * insert the tags, if they do not exist in the database
        /**
         * Some problem in codeforces have the same tag twice
         * And our system constrains same tag multiple times for a problem
         * So it results in an error. In order to fix it, we keep a map of booleans
         * Eg. https://codeforces.com/contest/1593/problem/B
         */
        const tagMap = {}

        for (let tag of tags) {
          // find or create the tag
          const tagObject = await this.prisma.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
          })
          if (!tagMap[tagObject.id]) {
            // insert tagId and problemId into the junction table
            await this.prisma.problemTag.create({
              data: {
                problemId: newProblem.id,
                tagId: tagObject.id,
              },
            })
            tagMap[tagObject.id] = true
          }
        }
        // save the problem id
        problemId = newProblem.id
      } catch (err) {
        throw new BadRequestException(err.message)
      }
    }

    // Check if the problem is already added previously by the user
    try {
      const foundSubmission = await this.prisma.submission.findFirst({
        where: {
          userId,
          problemId,
        },
      })
      // throw an error because an user can't add same problem twice
      if (foundSubmission) {
        throw new BadRequestException("Submission already exists!")
      }
    } catch (err) {
      throw err
    }
    // create the submission
    const newSubmsision = await this.prisma.submission.create({
      data: {
        solveTime,
        solvedAt,
        verdict,
        problemId,
        userId,
      },
    })
    // return the submission
    return newSubmsision
  }

  async updateSubmission({ id, verdict, solveTime, solvedAt }) {
    const options: any = {}
    if (verdict) options.verdict = verdict
    if (solveTime) options.solveTime = solveTime
    if (solvedAt) options.solvedAt = solvedAt
    try {
      await this.prisma.submission.update({
        where: { id },
        data: options,
      })
    } catch (err) {
      throw new BadRequestException("Something went wrong!")
    }
  }

  async deleteSubmission(id: any) {
    try {
      await this.prisma.submission.findFirstOrThrow({ where: { id } })
      await this.prisma.submission.delete({ where: { id } })
    } catch (err) {
      throw new BadRequestException("Submission not found!")
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
