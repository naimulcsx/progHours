import { IsAdmin } from "@/guards/is-admin"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { TagDto } from "@/validators/tag-dto"
import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseGuards } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiTags } from "@nestjs/swagger"
import { TagsService } from "./tags.service"

@ApiTags("Tags API")
@Controller("tags")
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get("")
  @ApiOperation({ summary: "Get all tags." })
  @ApiOkResponse({
    type: TagDto,
    description: "Records has been retrieved successfully.",
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: "Data not found",
  })
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getAllTags() {
    const tags = await this.tagService.getAllTags()
    return { statusCode: HttpStatus.OK, body: { tags } }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tag by id." })
  @ApiParam({
    name: "id",
    description: "Should be an id of a tag that exists in the database.",
    type: Number,
    format: "uuid",
    required: true,
  })
  @ApiOkResponse({
    type: TagDto,
    description: "Record has been retrieved successfully.",
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: "Data not found",
  })
  @ApiProduces("application/json")
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getTagByID(@Param("id", ParseIntPipe) id: number) {
    const tag = await this.tagService.getTagByID(id)

    return { statusCode: HttpStatus.OK, body: { tag } }
  }
}
