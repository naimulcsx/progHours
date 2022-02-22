import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/login')
  handleLogin(@Body() body: any) {
    return body;
  }
  @Post('/register')
  handleRegister(@Body() body: CreateUserDto) {
    return body;
  }
}
