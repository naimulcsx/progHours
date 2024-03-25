import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

import { ActiveUserData, User } from "~/modules/auth/decorators/user.decorator";

import { CreateUserStudyDto } from "../dto";
import { UserStudiesService } from "../providers/user-studies.service";

@Controller("/user-studies")
@ApiTags("User Studies")
export class UserStudiesController {
  constructor(private readonly userStudiesService: UserStudiesService) {}

  @Post("/")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Create a new user study." })
  @ApiCreatedResponse({ description: "User study created." })
  async createUserStudy(
    @Body() createUserStudyDto: CreateUserStudyDto,
    @User() user: ActiveUserData
  ) {
    return await this.userStudiesService.createUserStudy(
      user.sub,
      createUserStudyDto
    );
  }

  @Get("/")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get all user studies" })
  @ApiOkResponse({
    description: "User studies retrieved successfully"
  })
  async getUserStudies(@User() user: ActiveUserData) {
    return this.userStudiesService.getUserStudies(user.sub);
  }

  @Get(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get an user study by ID" })
  @ApiOkResponse({
    description: "Study data retrieved successfully"
  })
  @ApiNotFoundResponse({
    description: "User study not found"
  })
  async getUser(@Param("id") id: string) {
    return this.userStudiesService.getUserStudy(id);
  }

  @Delete(":id")
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Delete an user study" })
  @ApiOkResponse({ description: "User study deleted" })
  async deleteUserStudy(@Param("id") id: string) {
    return this.userStudiesService.deleteUserStudy(id);
  }
}
