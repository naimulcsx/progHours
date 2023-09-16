import { Injectable, NotFoundException } from "@nestjs/common";

import { StatisticsService } from "~/modules/statistics/services/statistics.service";
import { UsersService } from "~/modules/users/providers/users.service";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly usersService: UsersService
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
      userId: user.id,
      fullName: user.fullName,
      userName: user.username,
      metaData: user.metaData,
      solveCountByTags,
      weeklyStatistics,
      solveTimeByTags,
      ...result
    };
  }
}
