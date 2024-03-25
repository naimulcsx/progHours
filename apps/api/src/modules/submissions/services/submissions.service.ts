import moment from "moment";

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef
} from "@nestjs/common";

import { ParserService } from "~/modules/parser/services/parser.service";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { ProblemsService } from "~/modules/problems/services/problems.service";
import { TrackerService } from "~/modules/tracker/services/tracker.service";

import { CreateSubmissionDto } from "../dto/create-submission.dto";
import { UpdateSubmissionDto } from "../dto/update-sumission.dto";

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject(forwardRef(() => TrackerService))
    private readonly trackerService: TrackerService,

    private readonly prisma: PrismaService,
    private readonly parserService: ParserService,
    private readonly problemsService: ProblemsService
  ) {}

  getByUser(userId: string) {
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

  async getByUserAndUrl(userId: string, url: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { url }
    });
    if (!problem) return null;
    const submission = await this.prisma.submission.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId: problem.id
        }
      }
    });
    if (!submission) return null;
    return submission;
  }

  async exists(userId: string, url: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { url }
    });
    if (!problem) return false;
    const submission = await this.prisma.submission.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId: problem.id
        }
      }
    });
    return submission ? true : false;
  }

  async create(
    userId: string,
    createSubmissionDto: CreateSubmissionDto,
    withVerification = false
  ) {
    const url = this.parserService.getUnifiedUrl(createSubmissionDto.url);
    let problemId: string;
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
        },
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
        }
      });

      // Add to VERIFY_QUEUE
      if (withVerification) {
        const _url = new URL(url);
        if (_url.host === "codeforces.com") {
          await this.trackerService.verifySingle({
            submissionId: newSubmission.id,
            userId,
            url,
            judge: "CODEFORCES"
          });
        }
      }

      return newSubmission;
    } catch (error) {
      const uniqueConstraintErrorCode = "P2002";
      if (error?.code === uniqueConstraintErrorCode) {
        throw new BadRequestException("Submission exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async update(submissionId: string, updateSubmissionDto: UpdateSubmissionDto) {
    const updatedSubmission = await this.prisma.submission.update({
      where: { id: submissionId },
      data: {
        ...updateSubmissionDto,
        ...(updateSubmissionDto.solvedAt && {
          solvedAt: moment.utc(updateSubmissionDto.solvedAt).toDate()
        })
      }
    });
    return updatedSubmission;
  }

  async markVerified(submissionId: string) {
    return this.prisma.submission.update({
      where: { id: submissionId },
      data: { isVerified: true }
    });
  }

  async delete(submissionId: string) {
    const result = await this.prisma.submission.delete({
      where: { id: submissionId }
    });
    return result;
  }
}
