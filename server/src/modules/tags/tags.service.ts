import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  getAllTags() {
    return this.prisma.tag.findMany({ orderBy: { id: "asc" } })
  }

  getTagByID(id: number) {
    return this.prisma.tag.findFirst({
      where: { id },
    })
  }
}
