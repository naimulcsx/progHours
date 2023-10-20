import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class HandlesRepository {
  constructor(private readonly prisma: PrismaService) {}

  // create operations
  async create(data: Prisma.UserHandleCreateInput) {
    return this.prisma.userHandle.create({ data });
  }

  async createBulk(data: Prisma.UserHandleCreateManyInput[]) {
    return this.prisma.userHandle.createMany({ data });
  }

  // read operations
  async getAll() {
    return this.prisma.userHandle.findMany();
  }

  async getByCriteria(where: Prisma.UserHandleWhereInput) {
    return this.prisma.userHandle.findMany({ where });
  }

  async getById(id: string) {
    return this.prisma.userHandle.findUnique({ where: { id } });
  }

  // update operations
  async updateById(id: string, data: Prisma.UserHandleUpdateInput) {
    return this.prisma.userHandle.update({ where: { id }, data });
  }

  // delete operations
  async deleteById(id: string) {
    return this.prisma.userHandle.delete({ where: { id } });
  }

  async deleteByCriteria(where: Prisma.UserHandleWhereInput) {
    return this.prisma.userHandle.deleteMany({ where });
  }
}
