import { createId } from "@paralleldrive/cuid2";

import { Injectable, NotFoundException } from "@nestjs/common";

import { ParserService } from "~/modules/parser/services/parser.service";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { CreateProblemDto } from "../dto/create-problem.dto";

@Injectable()
export class ProblemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parserService: ParserService
  ) {}

  async getByUrl(url: string) {
    return this.prisma.problem.findUnique({ where: { url } });
  }

  async getById(problemId: string) {
    return this.prisma.problem.findUnique({
      where: { id: problemId },
      include: { problemTags: { include: { tag: true } } }
    });
  }

  async createProblem({ tags, ...problemData }: CreateProblemDto) {
    const problem = await this.prisma.problem.findUnique({
      where: { url: problemData.url },
      include: {
        problemTags: {
          include: {
            tag: true
          }
        }
      }
    });
    if (problem) {
      return problem;
    }
    const createdProblem = await this.prisma.problem.create({
      data: {
        id: createId(),
        ...problemData,
        problemTags: {
          create: [...new Set(tags)].map((tagName) => {
            return {
              tag: {
                connectOrCreate: {
                  where: {
                    name: tagName
                  },
                  create: {
                    id: createId(),
                    name: tagName
                  }
                }
              }
            };
          })
        }
      },
      include: {
        problemTags: {
          include: {
            tag: true
          }
        }
      }
    });
    return createdProblem;
  }

  async refetchById(problemId: string) {
    const problem = await this.prisma.problem.findUnique({
      where: { id: problemId }
    });
    if (!problem) {
      throw new NotFoundException("Problem not found");
    }
    const { tags, ...problemData } = await this.parserService.parse(
      problem.url
    );
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [_, updatedProblem] = await this.prisma.$transaction([
      this.prisma.problemTag.deleteMany({ where: { problemId } }),
      this.prisma.problem.update({
        where: { id: problemId },
        data: {
          ...problemData,
          problemTags: {
            create: [...new Set(tags)].map((tagName) => {
              return {
                tag: {
                  connectOrCreate: {
                    where: {
                      name: tagName
                    },
                    create: {
                      id: createId(),
                      name: tagName
                    }
                  }
                }
              };
            })
          }
        },
        include: {
          problemTags: {
            include: {
              tag: true
            }
          }
        }
      })
    ]);
    return {
      ...updatedProblem
    };
  }
}
