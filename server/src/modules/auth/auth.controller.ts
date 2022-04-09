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
  ForbiddenException,
} from "@nestjs/common"
import { Response } from "express"

/**
 * Import Data Transfer Objects (DTO)
 */
import { CreateUserDto } from "@/validators/create-user-dto"
import { LoginUserDto } from "@/validators/login-user-dto"

/**
 * Import Services
 */
import { AuthService } from "@/modules/auth/auth.service"

/**
 * Import Guards
 */
import { IsAuthenticatedGuard } from "@/guards/is-authenticated"
import { UsersService } from "../users/users.service"
import { User } from "../users/user.entity"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  /**
   * POST /auth/login
   */
  @Post("/login")
  async handleLogin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { username, password } = body
    const { accessToken, user } = await this.authService.handleLogin({
      username,
      password,
    })
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
  async handleRegister(@Body() body: CreateUserDto) {
    try {
      const { name, username, password, email } = body
      const user = await this.usersService.createUser({
        name,
        username,
        password,
        email,
      })
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
    const user = await this.usersService.getUser({ id: req.user.id })
    if (!user) {
      throw new ForbiddenException("User not found")
    }
    const { id, name, email, username, role } = user
    return { id, name, email, username, role }
  }

  /**
   * GET /auth/logout
   */
  @Get("/logout")
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) })
    return {}
  }
}
