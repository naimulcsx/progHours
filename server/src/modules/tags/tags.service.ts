import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAllTags() {
    return await this.prisma.tag.findMany()
  }
}
