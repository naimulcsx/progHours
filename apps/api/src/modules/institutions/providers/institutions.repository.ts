import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class InstitutionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.institution.findMany();
  }
}
