import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common"

/**
 * Import services
 */
import { PrismaService } from "../prisma/prisma.service"
import { ParsersService } from "../parsers/parsers.service"

@Injectable()
export class ProblemsService {
  constructor(
    private prisma: PrismaService,
    @Inject(ParsersService) private parsersService: ParsersService
  ) {}

  async createProblem({ pid, name, link, difficulty, onlineJudgeId }) {
    try {
      /**
       * check if the problem link is valid
       * if so, then throw an error
       */
      if (!this.parsersService.isValidLink(link))
        throw new BadRequestException("problem link is not valid!")

      /**
       * check if the problem is exist
       * if so, then throw an error
       */
      const foundProblem = await this.prisma.problem.findFirst({
        where: {
          OR: [{ pid: pid.toUpperCase() }, { link }],
        },
      })
      if (foundProblem) throw new BadRequestException("problem already exist!")

      // create a new problem
      return await this.prisma.problem.create({
        data: {
          pid: pid.toUpperCase(),
          name,
          link,
          difficulty: Number(difficulty),
          onlineJudgeId: Number(onlineJudgeId),
        },
      })
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async getProblem(pid: string) {
    try {
      const problem = await this.prisma.problem.findFirst({
        where: { pid },
      })

      if (!problem) throw new NotFoundException("Problem not found!")

      return problem
    } catch (err) {
      throw err
    }
  }

  async updateProblem(
    { name, pid: problemId, link, difficulty, onlineJudgeId },
    pid: string
  ) {
    try {
      const problem = await this.getProblem(pid)

      return await this.prisma.problem.update({
        where: {
          id: problem.id,
        },
        data: {
          pid: problemId.toUpperCase(),
          name,
          link,
          difficulty: Number(difficulty),
          onlineJudgeId: Number(onlineJudgeId),
        },
      })
    } catch (err) {
      throw err
    }
  }

  async deleteProblem(pid: string) {
    try {
      const problem = await this.getProblem(pid)

      // return problem
      return await this.prisma.problem.delete({
        where: {
          id: problem.id,
        },
      })
    } catch (err) {
      throw err
    }
  }

  async getAllProblems () {
    return this.prisma.problem.findMany()
  }
}
