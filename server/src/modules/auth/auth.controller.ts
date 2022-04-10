import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  ConflictException,
  HttpStatus,
} from "@nestjs/common"

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"

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
import { UsersService } from "../users/users.service"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  /**
   * POST /auth/login
   */
  @ApiOperation({ summary: "Handle user login." })
  @ApiOkResponse({ description: "Login successful." })
  @ApiForbiddenResponse({ description: "Forbidden (Password is wrong)." })
  @ApiNotFoundResponse({ description: "User not found." })
  @Post("/login")
  async handleLogin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { username, password } = body
    const { accessToken, user } = await this.authService.handleLogin(
      username,
      password
    )
    res.cookie("accessToken", accessToken)
    res.status(200)
    return {
      accessToken,
      user,
    }
  }

  /**
   * POST /auth/register
   */
  @ApiOperation({ summary: "Register new user." })
  @ApiCreatedResponse({ description: "User successfully created." })
  @ApiConflictResponse({ description: "Username/Email already exists." })
  @ApiBadRequestResponse({
    description: "Request body doesn't contain valid data.",
  })
  @Post("/register")
  async handleRegister(@Body() body: CreateUserDto) {
    try {
      const { name, username, password, email } = body
      const user = await this.usersService.createUser(
        name,
        username,
        password,
        email
      )
      return { user }
    } catch (err) {
      if (err instanceof ConflictException) throw err
      throw new Error(err)
    }
  }

  /**
   * GET /auth/logout
   */
  @ApiOperation({ summary: "Logout user." })
  @ApiOkResponse({ description: "Logout success." })
  @Get("/logout")
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) })
    return {
      statusCode: HttpStatus.OK,
      success: true,
    }
  }
}
