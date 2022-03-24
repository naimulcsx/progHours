import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common"

/**
 * Import Services
 */
import { UsersService } from "@/modules/users/users.service"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get("ranklist")
  async getRanklist() {
    const result = await this.usersService.getRanklist()
    return {
      ranklist: result,
    }
  }

  @Get("stats")
  @UseGuards(IsAuthenticatedGuard)
  async getUserStats(@Req() req: any) {
    const progress = await this.usersService.getProgress(req.user)
    const frequency = await this.usersService.getStats(req.user)
    return {
      verdict: frequency,
      ...progress,
    }
  }

  @Patch("account")
  @UseGuards(IsAuthenticatedGuard)
  async updateAccount(@Body() body: any, @Req() req: any) {
    await this.usersService.updateAccount(body, req.user.id)

    return {
      statusCode: HttpStatus.OK,
      message: "account is updated",
    }
  }
}
