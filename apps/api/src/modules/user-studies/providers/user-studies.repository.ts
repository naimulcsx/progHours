import { Prisma, UserStudy } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class UserStudiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(args: Prisma.UserStudyCreateArgs): Promise<UserStudy> {
    return this.prisma.userStudy.create(args);
  }

  async getAll(userId: string): Promise<UserStudy[]> {
    return this.prisma.userStudy.findMany({
      where: { userId },
      include: {
        userStudyTags: true
      }
    });
  }

  async getById(id: string): Promise<UserStudy> {
    return this.prisma.userStudy.findUnique({ where: { id } });
  }

  async updateById(
    id: string,
    data: Prisma.UserStudyUpdateInput
  ): Promise<UserStudy> {
    return this.prisma.userStudy.update({ where: { id }, data });
  }

  async deleteById(id: string) {
    return this.prisma.userStudy.delete({ where: { id } });
  }
}
