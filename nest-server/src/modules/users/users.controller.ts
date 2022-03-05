import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
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

  @Get('stats')
  @UseGuards(IsAuthenticatedGuard)
  async getUserStats(@Req() req: any) {
    const frequency = await this.usersService.getStats(req.user);
    return {
      verdict: frequency,
    };
  }
}
