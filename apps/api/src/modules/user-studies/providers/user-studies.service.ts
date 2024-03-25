import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { CreateUserStudyDto } from "../dto";
import { UserStudiesRepository } from "./user-studies.repository";

@Injectable()
export class UserStudiesService {
  constructor(
    private prisma: PrismaService,
    private readonly userStudiesRepository: UserStudiesRepository
  ) {}

  async createUserStudy(
    userId: string,
    createUserStudyDto: CreateUserStudyDto
  ) {
    return this.userStudiesRepository.create({
      data: {
        ...createUserStudyDto,
        user: { connect: { id: userId } },
        userStudyTags: {
          createMany: {
            data: createUserStudyDto.tags.map((tagId) => ({ tagId }))
          }
        }
      }
    });
  }

  async getUserStudies(userId: string) {
    return this.userStudiesRepository.getAllByUserId(userId);
  }

  async getUserStudy(id: string) {
    return this.userStudiesRepository.getById(id);
  }

  async deleteUserStudy(id: string) {
    const userStudy = await this.userStudiesRepository.getById(id);
    if (!userStudy) {
      throw new NotFoundException();
    }
    return await this.userStudiesRepository.deleteById(id);
  }
}
