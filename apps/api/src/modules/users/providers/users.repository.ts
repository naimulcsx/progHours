import { Prisma, User } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }
}
