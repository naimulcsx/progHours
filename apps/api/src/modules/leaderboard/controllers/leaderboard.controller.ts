import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";
import { LeaderboardService } from "../services/leaderboard.service";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Controller("leaderboard")
@ApiTags("Leaderboard")
@Auth(AuthType.None)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: "Get leaderboard" })
  @UseInterceptors(CacheInterceptor)
  @CacheKey("leaderboard")
  @CacheTTL(300000)
  async getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }
}
