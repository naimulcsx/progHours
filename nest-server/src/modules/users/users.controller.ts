import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('ranklist')
  async getRanklist() {
    const result = await this.usersService.getRanklist();
    return {
      ranklist: result,
    };
  }
}
