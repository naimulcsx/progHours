import {
  Body,
  Controller,
  Post,
  Res,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from 'src/validators/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * POST /auth/login
   */
  @Post('/login')
  async handleLogin(
    @Body() body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.getUser(body.username);
    //! if the user does not exist
    if (!user) throw new BadRequestException(['user not found']);
    const isValidPassword = await this.authService.comparePassword(
      body.password,
      user.password,
    );
    //! if the user exists but the provided password is wrong
    if (!isValidPassword) throw new ForbiddenException(['invalid password']);
    // user password is valid, so generate an accessToken and send it to the user
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
    );
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
      throw new BadRequestException(['Some error occured']);
    }
  }
}
