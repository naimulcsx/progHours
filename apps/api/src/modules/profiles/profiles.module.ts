import { Module } from "@nestjs/common";

import { LeaderboardModule } from "../leaderboard/leaderboard.module";
import { StatisticsModule } from "../statistics/statistics.module";
import { UsersModule } from "../users/users.module";
import { ProfilesController } from "./controllers/profiles.controller";
import { ProfilesService } from "./providers/profiles.service";

@Module({
  imports: [LeaderboardModule, UsersModule, StatisticsModule],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}
