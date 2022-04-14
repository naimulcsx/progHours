import {
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
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Patch("account")
  // @UseGuards(IsAuthenticatedGuard)
  // async updateAccount(@Body() body: UpdateUserDto, @Req() req: any) {
  //   await this.usersService.updateAccount(body, req.user.id)

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: "account is updated",
  //   }
  // }

  /**
   * GET /users/me
   * Returns the current logged in user
   */
  @Get("/me")
  @ApiOperation({ summary: "Returns the current logged in user." })
  @ApiOkResponse({ description: "Success." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UseGuards(IsAuthenticatedGuard)
  async getCurrentUser(@Req() req) {
    const user = await this.usersService.getUser({ id: req.user.id })
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    const { id, name, email, username, role } = user
    return { id, name, email, username, role }
  }
}
