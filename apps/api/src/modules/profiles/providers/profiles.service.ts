import { Cache } from "cache-manager";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { LeaderboardService } from "~/modules/leaderboard/services/leaderboard.service";
import { StatisticsService } from "~/modules/statistics/services/statistics.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { UsersService } from "~/modules/users/providers/users.service";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly usersService: UsersService,
    private readonly leaderboardService: LeaderboardService,
    private readonly submissionsService: SubmissionsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
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

  async getUserSubmissions(username: string) {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const cacheTtl = 120 * 60000; // 2h
    const cacheKey = "submissions/" + username;
    const cachedData = await this.cacheManager.get(cacheKey);
    if (!cachedData) {
      const submissions = this.submissionsService.getByUser(user.id);
      await this.cacheManager.set(cacheKey, submissions, cacheTtl);
      return submissions;
    }
    return cachedData;
  }
}
