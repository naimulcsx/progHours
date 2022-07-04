import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
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
    const { password, ...rest } = user
    return rest
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
    const { password, ...rest } = user
    return rest
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
   * Patch /users/{username}
   * Updates the user information
   */
  @Patch("/:username")
  async updateUser(@Body() body, @Req() req, @Param() params) {
    const { name, email, mobile, department, batch, cgpa } = body
    /**
     * Check if the user who authorized to make the change
     * An user can change the account informations of a particular username if
     * - His own personal info
     * - He is the admin
     */
    if (params.username.toLowerCase() === req.user.username.toLowerCase()) {
      try {
        await this.usersService.updateProfile(
          {
            name,
            email,
            mobile,
            department,
            batch: parseInt(batch),
            cgpa: parseFloat(cgpa),
          },
          req.user.id
        )
      } catch (e) {
        throw new InternalServerErrorException("Something went wrong!")
      }
    } else {
      throw new UnauthorizedException("You are not authorized!")
    }
  }

  // /**
  //  * PATCH /users/me
  //  * Updates the user information
  //  */
  // @Patch("/me")
  // @ApiOperation({ summary: "Updates the user information." })
  // @ApiOkResponse({ description: "Success." })
  // @ApiForbiddenResponse({ description: "Forbidden." })
  // async updateAccount(@Body() body: UpdateUserDto, @Req() req: any) {
  //   const { name, email, confirmPassword, currentPassword, newPassword } = body

  //   /**
  //    * Handle profile update
  //    */
  //   await this.usersService.updateProfile({ name, email }, req.user.id)
  //   /**
  //    * Handle password update
  //    */
  //   const passwordFields = [currentPassword, newPassword, confirmPassword]
  //   if (
  //     passwordFields.every((el) => el.length === 0) ||
  //     (passwordFields.some((el) => el.length > 0) &&
  //       passwordFields.some((el) => el.length === 0))
  //   ) {
  //     if (!passwordFields.every((el) => el.length === 0)) {
  //       throw new BadRequestException(
  //         "Please fill all the password related fields in order to change your password."
  //       )
  //     }
  //   } else {
  //     // await this.usersService.updatePassword(passwordFields, req.user.id)
  //   }

  //   /**
  //    * Send Response
  //    */
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: "Profile updated.",
  //   }
  // }
}
