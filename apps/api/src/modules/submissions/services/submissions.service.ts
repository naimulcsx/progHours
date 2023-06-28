import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { ParserService } from "~/modules/parser/services/parser.service";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { ProblemsService } from "~/modules/problems/services/problems.service";
import { CreateSubmissionDto } from "../dto/create-submission.dto";
import { UpdateSubmissionDto } from "../dto/update-sumission.dto";
import moment from "moment";

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parserService: ParserService,
    private readonly problemsService: ProblemsService
  ) {}

  getByUser(userId: number) {
    return this.prisma.submission.findMany({
      where: { userId },
      include: {
        problem: {
          include: {
            problemTags: {
              include: {
                tag: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async create(userId: number, createSubmissionDto: CreateSubmissionDto) {
    const url = this.parserService.getUnifiedUrl(createSubmissionDto.url);
    let problemId: number;
    const problem = await this.prisma.problem.findUnique({
      where: { url }
    });
    if (problem) {
      problemId = problem.id;
    } else {
      const parsedResult = await this.parserService.parse(url);
      const newProblem = await this.problemsService.createProblem(parsedResult);
      problemId = newProblem.id;
    }
    try {
      const newSubmission = await this.prisma.submission.create({
        data: {
          solveTime: createSubmissionDto.solveTime,
          verdict: createSubmissionDto.verdict,
          problemId,
          userId,
          solvedAt: new Date(createSubmissionDto.solvedAt)
        }
      });
      return newSubmission;
    } catch (error) {
      const uniqueConstraintErrorCode = "P2002";
      if (error?.code === uniqueConstraintErrorCode) {
        throw new BadRequestException("Submission exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto) {
    console.log(
      updateSubmissionDto.solvedAt,
      moment(updateSubmissionDto.solvedAt).utcOffset(6).toDate()
    );
    const updatedSubmission = await this.prisma.submission.update({
      where: { id },
      data: {
        solvedAt: moment.utc(updateSubmissionDto.solvedAt).toDate()
      }
    });
    return updatedSubmission;
  }
}
