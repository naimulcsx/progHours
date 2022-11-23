import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class HandlesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get a handle
   */
  findHandle({ userId, onlineJudgeId }) {
    return this.prisma.handle.findFirst({
      where: {
        userId,
        onlineJudgeId,
      },
      include: {
        onlineJudge: true,
      },
    })
  }

  /**
   * Create a handle
   */
  async createHandles({ handle, onlineJudgeId, userId }) {
    return this.prisma.handle.create({
      data: {
        handle,
        onlineJudgeId,
        userId,
      },
    })
  }

  /**
   * Find all handles
   */
  async findAllHandles(userId: number) {
    return this.prisma.handle.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        onlineJudge: true,
      },
    })
  }

  /**
   * Delete handle
   */
  async deleteHandle(userId: number, onlineJudgeId: number) {
    const foundHandle = await this.findHandle({ userId, onlineJudgeId })

    return this.prisma.handle.delete({
      where: {
        id: foundHandle.id,
      },
    })
  }

  /**
   * Update handle
   */
  async updateHandle(userId: number, onlineJudgeId: number, handle: string) {
    const foundHandle = await this.findHandle({ userId, onlineJudgeId })

    return this.prisma.handle.update({
      where: {
        id: foundHandle.id,
      },
      data: {
        handle,
        onlineJudgeId,
        userId,
      },
    })
  }

  async getUserByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username: username.toLowerCase(),
      },
    })
  }

  /**
   * Get handle by username
   */
  async getHandleByUsername(username: string) {
    const findUser = await this.getUserByUsername(username)

    return this.prisma.handle.findMany({
      where: {
        userId: findUser.id,
      },
      include: {
        onlineJudge: true,
      },
    })
  }
}
