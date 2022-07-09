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

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   */
  @ApiOperation({ summary: "Handle user login." })
  @ApiOkResponse({ description: "Login successful." })
  @ApiForbiddenResponse({ description: "Forbidden (Password is wrong)." })
  @ApiNotFoundResponse({ description: "User not found." })
  @Post("/login")
  async signIn(
    @Body() { username, password }: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, user } = await this.authService.signIn({
      username,
      password,
    })
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
  async signUp(@Body() { name, username, password, email }: CreateUserDto) {
    const { password: pw, ...rest } = await this.authService.signUp({
      name,
      email,
      username,
      password,
    })
    return rest
  }

  /**
   * GET /auth/logout
   */
  @ApiOperation({ summary: "Logout user." })
  @ApiOkResponse({ description: "Logout success." })
  @Get("/logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    // ! TODO: use res.clearCookie()
    res.cookie("accessToken", "", { expires: new Date(Date.now() - 100) })
    return {
      statusCode: HttpStatus.OK,
      success: true,
    }
  }
}
