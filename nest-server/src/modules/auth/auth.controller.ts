import {
  Body,
  Controller,
  Post,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/validators/create-user-dto';
import { LoginUserDto } from 'src/validators/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * POST /auth/login
   */
  @Post('/login')
  async handleLogin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.getAccessToken(body);
    res.cookie('accessToken', accessToken);
    return {
      accessToken,
    };
  }
  /**
   * POST /auth/register
   */
  @Post('/register')
  async handleRegister(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.authService.registerUser(body);
      return { user };
    } catch (err) {
      throw new BadRequestException([
        err?.detail ? err.detail : 'Some error occured',
      ]);
    }
  }
}
