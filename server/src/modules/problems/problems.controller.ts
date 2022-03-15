import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { IsAuthenticatedGuard } from "src/guards/is-authenticated"
import { ProblemsService } from "./problems.service"

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
