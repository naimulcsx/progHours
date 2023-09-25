import { Module } from "@nestjs/common";

import { StatisticsModule } from "../statistics/statistics.module";
import { LeaderboardController } from "./controllers/leaderboard.controller";
import { LeaderboardService } from "./services/leaderboard.service";

@Module({
  imports: [StatisticsModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService]
})
export class LeaderboardModule {}
