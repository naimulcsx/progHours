import { Controller, Param, Post, Req, UseGuards } from "@nestjs/common"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

/**
 * Import Services
 */
import { ProblemsService } from "@/modules/problems/problems.service"

@Controller("problems")
@UseGuards(IsAuthenticatedGuard)
export class ProblemsController {
  constructor(private readonly problemService: ProblemsService) {}
  @Post(":id/tags")
  async addTag(@Param("id") id: string, @Req() req) {
    const { body, user } = req
    const result = await this.problemService.findOrCreateUserTag(
      user.id,
      parseInt(id),
      body.tag_name
    )
    return {
      id,
      result,
    }
  }
}
