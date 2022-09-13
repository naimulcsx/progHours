import { IsAdmin } from "@/guards/is-admin"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common"
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from "@nestjs/swagger"
import { TagsService } from "./tags.service"

@Controller("tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get("/")
  @ApiOperation({ summary: "Get all problems tags" })
  @ApiCreatedResponse({ description: "Success" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getAllTags() {
    const tags = await this.tagsService.getAllTags()

    return { statusCode: HttpStatus.OK, body: { tags } }
  }
}
