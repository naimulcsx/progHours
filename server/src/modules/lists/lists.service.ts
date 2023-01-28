import { Injectable, NotFoundException } from "@nestjs/common"
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

  async updateList(id: number, updateListDto: UpdateListDto) {
    return await this.prisma.list.update({ where: { id }, data: { ...updateListDto } })
  }

  async removeCollection(listId: number, collectionId: number) {
    await this.prisma.listProblem.deleteMany({ where: { collectionId, listId } })
    await this.prisma.collection.delete({ where: { id: collectionId } })
  }

  async getListProgress(listId: number) {
    const list = await this.prisma.list.findUnique({
      where: { id: listId },
      include: { group: true },
    })
    if (!list) {
      return new NotFoundException("List not found!")
    }
    const members = await this.prisma.userGroup.findMany({
      where: { groupId: list.group.id },
      include: { user: true },
    })
    const problems = await this.prisma.listProblem.findMany({
      where: { listId },
      include: { problem: true },
    })
    const result = {}
    for (let i = 0; i < problems.length; ++i) {
      const problem = problems[i]
      for (let j = 0; j < members.length; ++j) {
        const user = members[j]
        const submission = await this.prisma.submission.findFirst({
          where: { userId: user.user.id, problemId: problem.problem.id },
        })

        const key = user.user.username + user.user.name
        if (!result[key]) result[key] = []
        if (submission) {
          result[key].push({ name: user.user.name, pid: problem.problem.pid })
        }
      }
    }
    return {
      problems: problems.map((item) => item.problem.pid),
      result,
    }
  }
  async updateCollection(collectionId: number, name: string) {
    await this.prisma.collection.update({ where: { id: collectionId }, data: { name } })
  }

  async deleteList(listId: number) {
    await this.prisma.listProblem.deleteMany({ where: { listId } })
    await this.prisma.collection.deleteMany({ where: { listId } })
    await this.prisma.list.delete({ where: { id: listId } })
  }
}
