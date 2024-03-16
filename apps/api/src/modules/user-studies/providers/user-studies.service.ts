import { createId } from "@paralleldrive/cuid2";

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { CreateUserStudyDto, UpdateUserStudyDto } from "../dto";
import { UserStudiesRepository } from "./user-studies.repository";

@Injectable()
export class UserStudiesService {
  constructor(
    private prisma: PrismaService,
    private readonly userStudiesRepository: UserStudiesRepository
  ) {}

  /**
   * Create a new study list
   */
  async createUserStudy(body: CreateUserStudyDto, userId: string) {
    const { tags, ...restInputs } = body;

    const isDuplicate = await this.prisma.userStudy.findFirst({
      where: {
        userId,
        resourceLink: body.resourceLink,
        title: body.title
      }
    });
    if (isDuplicate) {
      throw new BadRequestException(
        "Already exists! Please put another link or title!"
      );
    }

    const studyTags = [];
    // check if given tags exist on 'Tags table'
    for (const tag of tags) {
      const foundTag = await this.prisma.tag.findUnique({
        where: { name: tag }
      });

      if (!foundTag) {
        throw new BadRequestException("Invalid tags!");
      }

      studyTags.push({ tagId: foundTag.id });
    }

    return this.userStudiesRepository.create({
      data: {
        ...restInputs,
        studyDate: new Date(restInputs.studyDate),
        id: createId(),
        userId,
        userStudyTags: {
          createMany: {
            data: studyTags
          }
        }
      }
    });
  }

  /**
   * find all user studies
   */
  async getUserStudies(userId: string) {
    return this.userStudiesRepository.getAll(userId);
  }

  /**
   * get user study by id
   */
  async getUserStudy(id: string) {
    return this.userStudiesRepository.getById(id);
  }

  /**
   * update user study by id
   */
  async updateUserStudy(id: string, data: UpdateUserStudyDto) {
    const { tags, ...restInputs } = data;

    const foundStudy = await this.userStudiesRepository.getById(id);
    if (!foundStudy) throw new NotFoundException();

    const isDuplicate = await this.prisma.userStudy.findFirst({
      where: {
        userId: foundStudy.userId,
        resourceLink: data.resourceLink,
        title: data.title
      }
    });
    if (isDuplicate) {
      throw new BadRequestException(
        "Already exists! Please put another link or title!"
      );
    }

    // check if given tags exist on 'Tags table'
    for (const tag of tags) {
      const foundTag = await this.prisma.tag.findUnique({
        where: { name: tag }
      });

      if (!foundTag) {
        throw new BadRequestException("Invalid tags!");
      }

      await this.prisma.userStudyTag.upsert({
        where: {
          userStudyId_tagId: { userStudyId: foundStudy.id, tagId: foundTag.id }
        },
        create: { userStudyId: foundStudy.id, tagId: foundTag.id },
        update: { tagId: foundTag.id }
      });
    }

    return this.userStudiesRepository.updateById(id, {
      ...restInputs,
      studyDate: new Date(restInputs.studyDate)
    });
  }

  /**
   * delete user study by id
   */
  async deleteUserStudy(id: string) {
    const foundStudy = await this.userStudiesRepository.getById(id);
    if (!foundStudy) throw new NotFoundException();

    await this.prisma.userStudy.delete({
      where: { id }
    });
  }
}
