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
import { ApiTags } from "@nestjs/swagger"

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
  @Get("/ranklist")
  async getRanklist() {
    const result = await this.usersService.getRanklist()
    return {
      ranklist: result,
    }
  }

  @Get("/stats")
  @UseGuards(IsAuthenticatedGuard)
  async getUserStats(@Req() req: any) {
    const progress = await this.usersService.getProgress(req.user)
    const frequency = await this.usersService.getStats(req.user)
    return {
      verdict: frequency,
      ...progress,
    }
  }

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
