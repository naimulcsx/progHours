import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class StudiesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new study list
   */
  async createUserStudy({ title, studyDate, studyTime, type, difficulty, link, language }, userId) {
    try {
      const study = await this.prisma.userStudy.findUnique({
        where: {
          link,
        },
      })

      if (study) throw new BadRequestException("Study already exists")

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
    } catch (err) {
      throw err
    }
  }

  /**
   * Get all study list
   */
  getStudiesByUserId(userId: number) {
    return this.prisma.userStudy.findMany({
      where: { userId },
      orderBy: { studyDate: "desc" },
    })
  }

  /**
   * Get a study list
   */
  getStudyById(id: any) {
    return this.prisma.userStudy.findFirst({
      where: { id },
    })
  }

  /**
   * Update a study list
   */
  async updateStudy(id: number, userId: number, body: any) {
    try {
      // get study by id
      const study = await this.getStudyById(id)

      // check if the study exists
      if (!study) throw new NotFoundException("Study not found")

      // check if the user is the owner of the study
      if (study.userId !== userId) {
        throw new ForbiddenException("You are not authorized!")
      }
      // update the study
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
      // get study by id
      const study = await this.getStudyById(id)

      // check if the study exists
      if (!study) throw new NotFoundException("Study not found")

      // check if the user is the owner of the study
      if (study.userId !== userId) {
        throw new ForbiddenException("You are not authorized!")
      }

      // delete the study
      return this.prisma.userStudy.delete({
        where: { id },
      })
    } catch (err) {
      throw err
    }
  }
}
