import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common"

import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"

/**
 * Import Services
 */
import { UsersService } from "@/modules/users/users.service"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

/**
 * Import Dto
 */
import { UpdateUserDto } from "@/validators/update-user-dto"

@Controller("/users")
@ApiTags("users")
@UseGuards(IsAuthenticatedGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users/me
   * Returns the current logged in user
   */
  @Get("/me")
  @ApiOperation({ summary: "Returns the current logged in user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getCurrentUser(@Req() req) {
    const user = await this.usersService.getUser({ id: req.user.id })
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const { id, name, email, username, role } = user
    return { id, name, email, username, role }
  }

  /**
   * GET /users/{username}
   * Returns user by username.
   */
  @Get("/:username")
  @ApiOperation({ summary: "Returns user by username." })
  @ApiOkResponse({ description: "Success." })
  @ApiNotFoundResponse({ description: "User not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async getUserByUsername(@Param() params) {
    const user = await this.usersService.getUser({ username: params.username })
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const { id, name, email, username, role } = user
    return { id, name, email, username, role }
  }

  /**
   * PATCH /users/me
   * Updates the user information
   */
  @Patch("/me")
  @ApiOperation({ summary: "Updates the user information." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async updateAccount(@Body() body: UpdateUserDto, @Req() req: any) {
    const { name, email, confirmPassword, currentPassword, newPassword } = body

    /**
     * Handle profile update
     */
    await this.usersService.updateProfile({ name, email }, req.user.id)
    /**
     * Handle password update
     */
    const passwordFields = [currentPassword, newPassword, confirmPassword]
    if (
      passwordFields.every((el) => el.length === 0) ||
      (passwordFields.some((el) => el.length > 0) &&
        passwordFields.some((el) => el.length === 0))
    ) {
      if (!passwordFields.every((el) => el.length === 0)) {
        throw new BadRequestException(
          "Please fill all the password related fields in order to change your password."
        )
      }
    } else {
      // await this.usersService.updatePassword(passwordFields, req.user.id)
    }

    /**
     * Send Response
     */
    return {
      statusCode: HttpStatus.OK,
      message: "Profile updated.",
    }
  }
}
