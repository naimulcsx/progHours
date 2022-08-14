import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common"

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger"

import { UsersService } from "@/modules/users/users.service"
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { SubmissionsService } from "../submissions/submissions.service"
import { IsAdmin } from "@/guards/is-admin"

@Controller("/users")
@ApiTags("Users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly submissionsService: SubmissionsService
  ) {}

  /**
   * @GET /users/me
   * Get the current user
   */
  @Get("/me")
  @ApiOperation({ summary: "Get the current user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard)
  async getCurrentUser(@Req() req) {
    // get the user
    const user = await this.usersService.getUserById(req.user.id)

    // if there is no user
    if (!user) {
      throw new NotFoundException("User not found.")
    }

    // excluding the hashed password
    delete user.password

    // return the response
    return {
      statusCode: HttpStatus.OK,
      body: {
        user,
      },
    }
  }

  /**
   * @Patch /users/me
   * Update user data / password
   */
  @Patch("/me")
  @ApiOperation({ summary: "Update current user." })
  @ApiQuery({
    name: "update",
    required: true,
    enum: ["data", "password"],
  })
  @UseGuards(IsAuthenticatedGuard)
  async updateUser(@Body() body: any, @Req() req, @Query() query) {
    // request body
    const {
      name,
      email,
      mobile,
      department,
      batch,
      cgpa,
      currentPassword,
      newPassword,
      section,
    } = body

    // handle user data update
    if (query.update === "data") {
      // update the user
      await this.usersService.updateProfile({
        id: req.user.id,
        name,
        email,
        mobile,
        department,
        batch,
        cgpa,
        section,
      })

      // return response
      return {
        statusCode: HttpStatus.OK,
      }
    }

    // handle password update
    else if (query.update === "password") {
      // update the password
      await this.usersService.updatePassword(
        { currentPassword, newPassword },
        req.user.id
      )

      // return response
      return {
        statusCode: HttpStatus.OK,
      }
    }

    // if there is no query params
    return new BadRequestException("Please use the update param.")
  }

  /**
   * @GET /users/{username}
   * Returns user by username.
   */
  @Get("/:username")
  @ApiOperation({ summary: "Get user by username." })
  @ApiOkResponse({ description: "Success." })
  @ApiNotFoundResponse({ description: "User not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getUserByUsername(@Param() params) {
    // get the user
    const user = await this.usersService.getUserByUsername(params.username)

    // if there is no user
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    delete user.password

    // return the user
    return {
      statusCode: HttpStatus.OK,
      body: { user },
    }
  }

  /**
   * @GET /users/{username}/submissions
   * Get submissions by a particular user
   */
  @Get("/:username/submissions")
  @ApiOperation({ summary: "Get submissions by a particular user." })
  async getSubmissions(@Param() params) {
    const { username } = params
    // get submissions
    const submissions = await this.submissionsService.getSubmissionsByUsername(
      username
    )
    // return the submissions
    return {
      statusCode: HttpStatus.OK,
      body: { submissions },
    }
  }

  /**********************  ADMIN  ******************** */
  /**
   * @GET /users
   */
  @Get("/")
  @ApiOperation({ summary: "Get all users" })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async getAllUsers() {
    const users = await this.usersService.getAllUsers()

    return {
      statusCode: HttpStatus.OK,
      body: users,
    }
  }

  /**
   * @Patch /users
   * Update user data
   */
  @Patch("/")
  @ApiOperation({ summary: "Update user data" })
  @UseGuards(IsAuthenticatedGuard, IsAdmin)
  async updateUserData(@Body() body: any) {
    const user = await this.usersService.updateUserData(body)

    return { statusCode: HttpStatus.OK, message: "User Updated", body: user }
  }
}
