import { Injectable, NotFoundException } from "@nestjs/common";

import { LeaderboardService } from "~/modules/leaderboard/services/leaderboard.service";
import { StatisticsService } from "~/modules/statistics/services/statistics.service";
import { UsersService } from "~/modules/users/providers/users.service";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly usersService: UsersService,
    private readonly leaderboardService: LeaderboardService
  ) {}

  async getUserProfile(username: string) {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const result = await this.statisticsService.getUserStatistics(user.id, {
      type: "full"
    });
    const solveCountByTags = await this.statisticsService.getTagsFrequency(
      user.id
    );
    const solveTimeByTags = await this.statisticsService.getTagsSolveTime(
      user.id
    );
    const weeklyStatistics = await this.statisticsService.getWeeklyStatistics(
      user.id
    );
    return {
      // user data
      userId: user.id,
      fullName: user.fullName,
      userName: user.username,
      metaData: user.metaData,

      // totalSolveTime, totalDifficulty, totalSolved, totalSolvedWithDifficulty
      ...result,

      // points and average difficulty
      ...this.leaderboardService.calculatePointsAndAvgDifficulty(result),

      // statistics
      solveCountByTags,
      weeklyStatistics,
      solveTimeByTags
    };
  }
}
