import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"

import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"

import { UsersService } from "@/modules/users/users.service"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { SubmissionsService } from "../submissions/submissions.service"
import { CreateStudyDto } from "@/validators/create-study-dto"
import { UserStudyService } from "../user-study/user-study.service"
import { UpdateStudyDto } from "@/validators/update-study-dto"

@Controller("/users")
@ApiTags("users")
@UseGuards(IsAuthenticatedGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly submissionsService: SubmissionsService,
    private readonly userStudyService: UserStudyService
  ) {}

  /**
   * @GET /users/me
   */
  @Get("/me")
  @ApiOperation({ summary: "Returns the current logged in user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getCurrentUser(@Req() req) {
    const user = await this.usersService.getUserById(req.user.id)
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const { password, ...rest } = user
    return {
      statusCode: HttpStatus.OK,
      body: {
        user: rest,
      },
    }
  }

  /**
   * @Patch /users/me
   */
  @Patch("/me")
  async updateUser(@Body() body: any, @Req() req) {
    const { name, email, mobile, department, batch, cgpa } = body

    const result = await this.usersService.updateProfile({
      id: req.user.id,
      name,
      email,
      mobile,
      department,
      batch,
      cgpa,
    })
    return {
      statusCode: HttpStatus.OK,
      data: {
        user: result,
      },
    }
  }

  /**
   * @GET /users/{username}
   * Returns user by username.
   */
  @Get("/:username")
  @ApiOperation({ summary: "Returns user by username." })
  @ApiOkResponse({ description: "Success." })
  @ApiNotFoundResponse({ description: "User not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getUserByUsername(@Param() params) {
    const user = await this.usersService.getUserByUsername(params.username)
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const { password, ...rest } = user
    return {
      statusCode: HttpStatus.OK,
      body: {
        user: rest,
      },
    }
  }

  @Patch("/update-password")
  async updatePassword(@Body() body, @Req() req: any) {
    const { currentPassword, newPassword } = body
    await this.usersService.updatePassword(
      { currentPassword, newPassword },
      req.user.id
    )
    return {
      status: "success",
    }
  }

  /**
   * @GET /users/{username}/submissions
   */
  @Get("/:username/submissions")
  async getSubmissions(@Param() params) {
    const submissions = await this.submissionsService.getSubmissionsByUsername(
      params.username
    )
    return {
      statusCode: HttpStatus.OK,
      body: { submissions },
    }
  }

  /**
   * @Post /users/user-study
   */
  @Post("/studies")
  @ApiOperation({ summary: "Create new user study" })
  @ApiCreatedResponse({ description: "User Study successfully created" })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async createUserStudy(@Body() body: CreateStudyDto, @Req() req: any) {
    const newUserStudy = await this.userStudyService.createUserStudy(
      body,
      req.user.id
    )

    return { statusCode: HttpStatus.CREATED, body: { studies: newUserStudy } }
  }

  /**
   * @GET /users/:userId/user-study
   */
  @Get("/me/studies")
  @ApiOperation({ summary: "Get all user studies" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getAllUserStudies(@Req() req) {
    const userStudies = await this.userStudyService.getAllUserStudies(
      req.user.id
    )

    return { statusCode: HttpStatus.OK, body: { studies: userStudies } }
  }

  /**
   * @Get
   */
  @Get("/me/studies/:id")
  @ApiOperation({ summary: "Get a particular user study" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getUserStudy(@Param("id", ParseIntPipe) id: any, @Req() req: any) {
    const userStudy = await this.userStudyService.getUserStudy(req.user.id, id)

    return { statusCode: HttpStatus.OK, body: { study: userStudy } }
  }

  /**
   * update user study
   */
  @Patch("/me/studies/:id")
  @ApiOperation({ summary: "Update a particular user study" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateStudyList(
    @Param("id", ParseIntPipe) id: any,
    @Body() body: UpdateStudyDto,
    @Req() req
  ) {
    await this.userStudyService.updateUserStudy(req.user.id, id, body)

    return { statusCode: HttpStatus.OK, message: "User study Updated" }
  }

  @Delete("/me/studies/:id")
  @ApiOperation({ summary: "Delete a particular user study" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async deleteUserStudy(@Param("id", ParseIntPipe) id: any, @Req() req) {
    await this.userStudyService.deleteUserStudy(id, req.user.id)

    return { statusCode: HttpStatus.OK, message: "user study deleted" }
  }
}
