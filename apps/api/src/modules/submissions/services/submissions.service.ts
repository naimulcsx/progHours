import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  getByUser(userId: number) {
    return this.prisma.submission.findMany({ where: { userId } });
  }
}
