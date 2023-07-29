import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, AuthType } from "~/modules/iam/auth/decorators/auth.decorator";
import { LeaderboardService } from "../services/leaderboard.service";

@Controller("leaderboard")
@ApiTags("Leaderboard")
@Auth(AuthType.None)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: "Get leaderboard" })
  async getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }
}
