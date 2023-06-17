import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { CreateProblemDto } from "../dto/create-problem.dto";

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
