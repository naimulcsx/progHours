import { Prisma, UserStudy } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class UserStudiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: {
    data: Prisma.UserStudyCreateInput;
  }): Promise<UserStudy> {
    const { data } = params;
    return this.prisma.userStudy.create({ data });
  }

  async getById(id: string): Promise<UserStudy> {
    return this.prisma.userStudy.findUnique({ where: { id } });
  }

  async getAll(): Promise<UserStudy[]> {
    return this.prisma.userStudy.findMany({ include: { userStudyTags: true } });
  }

  async getAllByUserId(userId: string): Promise<UserStudy[]> {
    return this.prisma.userStudy.findMany({
      where: { userId },
      include: {
        userStudyTags: true
      }
    });
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
