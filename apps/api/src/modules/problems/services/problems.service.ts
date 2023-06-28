import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { CreateProblemDto } from "../dto/create-problem.dto";
import { ParserService } from "~/modules/parser/services/parser.service";

@Injectable()
export class ProblemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parserService: ParserService
  ) {}

  async getById(id: number) {
    return this.prisma.problem.findUnique({
      where: { id },
      include: { problemTags: { include: { tag: true } } }
    });
  }

  async createProblem({ tags, ...problemData }: CreateProblemDto) {
    const createdProblem = await this.prisma.problem.create({
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

  async refetchById(id: number) {
    const problem = await this.prisma.problem.findUnique({ where: { id } });
    if (!problem) {
      throw new NotFoundException("Problem not found");
    }
    const { tags, ...problemData } = await this.parserService.parse(
      problem.url
    );
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [_, updatedProblem] = await this.prisma.$transaction([
      this.prisma.problemTag.deleteMany({ where: { problemId: id } }),
      this.prisma.problem.update({
        where: { id },
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
