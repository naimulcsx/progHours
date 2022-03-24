import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  BadRequestException,
  UseGuards,
  Req,
  Patch,
} from "@nestjs/common"
import { Response } from "express"

/**
 * Import Data Transfer Objects (DTO)
 */
import { CreateUserDto } from "@/validators/create-user-dto"
import { LoginUserDto } from "@/validators/login-user-dto"
import { UpdatePasswordDto } from "@/validators/update-password-dto"

/**
 * Import Services
 */
import { AuthService } from "@/modules/auth/auth.service"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * POST /auth/login
   */
  @Post("/login")
  async handleLogin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, user } =
      await this.authService.getAccessTokenWithUserInfo(body)
    res.cookie("accessToken", accessToken)
    return {
      accessToken,
      user,
    }
  }
  /**
   * POST /auth/register
   */
  @Post("/register")
  async handleRegister(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const user = await this.authService.registerUser(body)
      return { user }
    } catch (err) {
      throw new BadRequestException([
        err?.detail ? err.detail : "Some error occured",
      ])
    }
  }

  /**
   * GET /auth/user
   */
  @Get("/user")
  @UseGuards(IsAuthenticatedGuard)
  async getUserData(@Req() req) {
    return req.user
  }

  /**
   * GET /auth/logout
   */
  @Get("/logout")
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) })
    return {}
  }

  /**
   * Change user password
   */
  @Patch("change-password")
  @UseGuards(IsAuthenticatedGuard)
  async updateUserPassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    await this.authService.updateUserPassword(body, req.user.id)

    return { message: "updated password" }
  }
}
