import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getRoute() {
    return 'Hello auth';
  }
}
