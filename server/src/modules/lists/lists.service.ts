import { Injectable } from "@nestjs/common"
import e from "express"
import { ParsersService } from "../parsers/parsers.service"
import { PrismaService } from "../prisma/prisma.service"
import { CreateCollectionDto } from "./dto/create-collection.dto"
import { CreateListDto } from "./dto/create-list.dto"
import { UpdateListDto } from "./dto/update-list.dto"

@Injectable()
export class ListsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parsersService: ParsersService
  ) {}

  async create(createListDto: CreateListDto) {
    return this.prisma.list.create({
      data: createListDto,
    })
  }

  async createCollection(listId: number, createCollectionDto: CreateCollectionDto) {
    return this.prisma.collection.create({
      data: {
        listId: listId,
        ...createCollectionDto,
      },
    })
  }

  async getProblemIds(links: string) {
    const problemLinks = links
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
    const problemIds: number[] = []
    for (let i = 0; i < problemLinks.length; ++i) {
      const problemId = await this.parsersService.createOrParseProblem(problemLinks[i])
      problemIds.push(problemId)
    }
    return problemIds
  }

  async addProblemsToCollection(listId: number, collectionId: number, problemIds: number[]) {
    // delete existing problems
    const listProblems = await this.prisma.listProblem.findMany({ where: { listId, collectionId } })

    // add new problems
    for (let i = 0; i < problemIds.length; ++i) {
      const idx = listProblems.map((listProblem) => listProblem.problemId).indexOf(problemIds[i])
      if (idx === -1) {
        await this.prisma.listProblem.create({
          data: {
            listId,
            collectionId,
            problemId: problemIds[i],
            order: i + 1,
          },
        })
      } else {
        await this.prisma.listProblem.update({
          where: {
            id: listProblems[idx].id,
          },
          data: {
            order: i + 1,
          },
        })
      }
    }

    // delete problems
    for (let i = 0; i < listProblems.length; ++i) {
      if (!problemIds.includes(listProblems[i].problemId))
        await this.prisma.listProblem.delete({ where: { id: listProblems[i].id } })
    }
  }

  findAll() {
    return `This action returns all lists`
  }

  async findOne(id: number) {
    return this.prisma.list.findUnique({
      where: { id },
      include: {
        group: true,
        collections: { include: { problems: { include: { problem: true } } } },
      },
    })
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`
  }

  async removeCollection(listId: number, collectionId: number) {
    await this.prisma.listProblem.deleteMany({ where: { collectionId, listId } })
    await this.prisma.collection.delete({ where: { id: collectionId } })
  }
}
