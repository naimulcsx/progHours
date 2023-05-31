import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Auth, AuthType } from "./decorators/auth.decorator";

@Auth(AuthType.None)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
