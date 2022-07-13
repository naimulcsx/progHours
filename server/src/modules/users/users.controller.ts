import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"

import { UsersService } from "@/modules/users/users.service"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { SubmissionsService } from "../submissions/submissions.service"

@Controller("/users")
@ApiTags("users")
@UseGuards(IsAuthenticatedGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly submissionsService: SubmissionsService
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
}
