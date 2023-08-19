import { Module } from "@nestjs/common";
import { LeaderboardController } from "./controllers/leaderboard.controller";
import { LeaderboardService } from "./services/leaderboard.service";
import { StatisticsModule } from "../statistics/statistics.module";

@Module({
  imports: [StatisticsModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService]
})
export class LeaderboardModule {}
