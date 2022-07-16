import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UserStudyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new study list
   */
  createUserStudy(
    { title, studyDate, studyTime, type, difficulty, link, language },
    userId
  ) {
    return this.prisma.userStudy.create({
      data: {
        title,
        type,
        difficulty,
        link,
        language,
        userId,
        studyDate,
        studyTime,
      },
    })
  }

  /**
   * Get all study list
   */
  getAllUserStudies(userId: number) {
    return this.prisma.userStudy.findMany({
      where: { userId },
    })
  }

  /**
   * Get a study list
   */
  getUserStudy(userId, id: any) {
    return this.prisma.userStudy.findFirst({
      where: { id, userId },
    })
  }

  /**
   * Update a study list
   */
  async updateUserStudy(id: number, userId: number, body: any) {
    try {
      const foundList = await this.getUserStudy(userId, id)
      if (!foundList) throw new NotFoundException("Study list not found")

      return this.prisma.userStudy.update({
        where: { id },
        data: body,
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete a study list
   */
  async deleteUserStudy(id: any, userId: number) {
    try {
      const foundList = await this.getUserStudy(userId, id)
      if (!foundList) throw new NotFoundException("Study list not found")

      return this.prisma.userStudy.delete({
        where: { id },
      })
    } catch (err) {
      throw err
    }
  }
}
