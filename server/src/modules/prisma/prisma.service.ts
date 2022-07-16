import {
  BadRequestException,
  INestApplication,
  Injectable,
  OnModuleInit,
} from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { afterCreate } from "./subscribers/submissions.afterCreate"
import { afterDelete } from "./subscribers/submissions.afterDelete"

import * as bcrypt from "bcryptjs"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Middleware 1
    this.$use(async (params, next) => {
      if (params.model === "Submission" && params.action === "update") {
        const submission = await this.submission.findUnique({
          where: { id: params.args.where.id },
        })
        const userStat = await this.userStat.findUnique({
          where: { userId: submission.userId },
        })
        const data = params.args.data
        if (data.solveTime) {
          userStat.totalSolveTime += data.solveTime - submission.solveTime
        }
        if (data.verdict) {
          const problem = await this.problem.findUnique({
            where: { id: submission.problemId },
          })
          /**
           * If the verdict was AC, and changed to a verdict other than AC
           */
          if (data.verdict !== "AC" && submission.verdict === "AC") {
            userStat.totalSolved--
            userStat.totalSolveTime -= submission.solveTime
            if (problem.difficulty > 0) {
              userStat.totalSolvedWithDifficulty--
              userStat.totalDifficulty -= problem.difficulty
            }
          } else if (submission.verdict !== "AC" && data.verdict === "AC") {
            /**
             * If the verdict was non-AC, and changed to AC
             */
            userStat.totalSolved++
            userStat.totalSolveTime += submission.solveTime
            if (problem.difficulty > 0) {
              userStat.totalSolvedWithDifficulty++
              userStat.totalDifficulty += problem.difficulty
            }
          }
        }

        await this.userStat.update({
          where: { userId: submission.userId },
          data: userStat,
        })
      }

      const result = await next(params)

      // submissions subscribers
      await afterCreate(this, params, result)
      await afterDelete(this, params, result)

      // See results here
      return result
    })

    /**
     * Password hash before create a new user
     * Password hash before update password
     */
    this.$use(async (params, next) => {
      if (
        params.model === "User" &&
        (params.action === "create" || params.action === "update")
      ) {
        const user = params.args.data
        user.password = await bcrypt.hash(user.password, 10)
        params.args.data = user
      }

      return await next(params)
    })

    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close()
    })
  }
}
