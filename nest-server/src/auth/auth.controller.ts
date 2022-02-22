import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  handleLogin(@Body() body: any) {
    return body;
  }
  @Post('/register')
  async handleRegister(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.authService.register({
        ...body,
        role: 'user',
      });
      return {
        user,
      };
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return err;
    }
  }
}
