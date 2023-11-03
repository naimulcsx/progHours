import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

import { UsersService } from "~/modules/users/providers/users.service";

import { Auth, AuthType } from "../decorators/auth.decorator";
import { ActiveUserData, User } from "../decorators/user.decorator";
import { SignInDto } from "../dto/sign-in.dto";
import { SignUpDto } from "../dto/sign-up.dto";
import { AuthService } from "../services/auth.service";

@ApiTags("Auth")
@Controller("auth")
@Auth(AuthType.None)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Get("me")
  @Auth(AuthType.Bearer)
  @ApiBearerAuth("JWT")
  @ApiOperation({ summary: "Get active user" })
  @ApiOkResponse({
    description: "Active user"
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorized user"
  })
  async getActiveUser(@User() user: ActiveUserData) {
    const activeUser = await this.usersService.getUser(user.username);
    delete activeUser.password;
    return activeUser;
  }

  @Post("sign-up")
  @ApiOperation({ summary: "User sign up" })
  @ApiBody({
    type: SignUpDto,
    description: "User Sign Up"
  })
  @ApiConflictResponse({
    description: "Email / username exists"
  })
  @ApiCreatedResponse({
    description: "User sign up success"
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User sign in" })
  @ApiOkResponse({
    description: "User sign in success"
  })
  @ApiUnauthorizedResponse({
    description: "Invalid UID or password"
  })
  async signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    return this.authService.signIn(signInDto);
  }
}
