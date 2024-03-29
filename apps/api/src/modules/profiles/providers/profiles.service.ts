import { Institution } from "@prisma/client";
import { RedisCache } from "cache-manager-redis-yet";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { LeaderboardService } from "~/modules/leaderboard/services/leaderboard.service";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { StatisticsService } from "~/modules/statistics/services/statistics.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { UsersService } from "~/modules/users/providers/users.service";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly statisticsService: StatisticsService,
    private readonly usersService: UsersService,
    private readonly leaderboardService: LeaderboardService,
    private readonly submissionsService: SubmissionsService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache
  ) {}

  async getUserProfile(username: string) {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    let institution: Institution | null = null;
    if (user.institutionId) {
      institution = await this.prisma.institution.findUnique({
        where: { id: user.institutionId }
      });
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
    const rank = await this.cacheManager.store.client.hGet(
      "ranks",
      user.username
    );
    return {
      rank,

      // user data
      userId: user.id,
      fullName: user.fullName,
      userName: user.username,
      metaData: user.metaData,
      institution,

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
    username = username.toLowerCase();
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const cacheTtl = 120 * 60000; // 2h
    const cacheKey = "submissions/" + username;
    const cachedData = await this.cacheManager.get(cacheKey);
    if (!cachedData) {
      const submissions = await this.submissionsService.getByUser(user.id);
      await this.cacheManager.set(cacheKey, submissions, cacheTtl);
      return submissions;
    }
    return cachedData;
  }
}
