import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Auth, AuthType } from "./decorators/auth.decorator";
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
import { User, UserJwtPayload } from "./decorators/user.decorator";

@ApiTags("Auth")
@Auth(AuthType.None)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("me")
  @Auth(AuthType.Bearer)
  @ApiOperation({ summary: "Current user" })
  @ApiBearerAuth("JWT")
  @ApiOkResponse({
    description: "Active user"
  })
  @ApiUnauthorizedResponse({
    description: "No active user"
  })
  async getUser(@User() user: UserJwtPayload) {
    return user;
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
    description: "User signed up"
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User sign in" })
  @ApiOkResponse({
    description: "User logged in"
  })
  @ApiUnauthorizedResponse({
    description: "Invalid UID or password"
  })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
