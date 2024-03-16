import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

import { ActiveUserData, User } from "~/modules/auth/decorators/user.decorator";

import { CreateUserStudyDto, UpdateUserStudyDto } from "../dto";
import { UserStudiesService } from "../providers/user-studies.service";

@Controller("/studies")
@ApiTags("User Studies")
export class UserStudiesController {
  constructor(private readonly userStudiesService: UserStudiesService) {}

  /**
   * @Post /api/studies
   * Create a new study
   */
  @Post("/")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create a new study" })
  @ApiCreatedResponse({ description: "Created." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createUserStudy(
    @Body() body: CreateUserStudyDto,
    @User() user: ActiveUserData
  ) {
    return await this.userStudiesService.createUserStudy(body, user.sub);
  }

  /**
   * @Get /api/studies
   * Get all user studies
   */
  @Get()
  @ApiOperation({ summary: "Get all user studies" })
  @ApiBearerAuth("JWT")
  @ApiOkResponse({
    description: "All user studies"
  })
  async getUserStudies(@User() user: ActiveUserData) {
    return this.userStudiesService.getUserStudies(user.sub);
  }

  /**
   * @Get /api/studies/:id
   * Get user study by id
   */
  @Get(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get user study by id" })
  @ApiOkResponse({
    description: "Study data retrieved successfully"
  })
  @ApiNotFoundResponse({
    description: "Study data not found"
  })
  async getUser(@Param("id") id: string) {
    return this.userStudiesService.getUserStudy(id);
  }

  @Patch(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Update user study" })
  @ApiOkResponse({ description: "User study updated" })
  async updateUserStudies(
    @Param("id") id: string,
    @Body() updateUserStudyDto: UpdateUserStudyDto
  ) {
    return this.userStudiesService.updateUserStudy(id, updateUserStudyDto);
  }

  @Delete(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Delete study data" })
  @ApiOkResponse({ description: "Study data deleted" })
  async deletUserStudy(@Param("id") id: string) {
    return this.userStudiesService.deleteUserStudy(id);
  }
}
