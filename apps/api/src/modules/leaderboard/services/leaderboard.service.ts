import { RedisCache } from "cache-manager-redis-yet";
import moment, { Moment } from "moment";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";

import { StatisticsService } from "~/modules/statistics/services/statistics.service";

import {
  LeaderboardQueryDto,
  LeaderboardTypeEnum
} from "../dto/leaderboard-query.dto";

@Injectable()
export class LeaderboardService {
  constructor(
    private readonly statisticsService: StatisticsService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache
  ) {}

  async getLeaderboard(leaderboardQueryDto: LeaderboardQueryDto) {
    const type: "full" | "range" =
      leaderboardQueryDto.type === LeaderboardTypeEnum.Full ? "full" : "range";

    const args = {
      type,
      ...(leaderboardQueryDto.type === LeaderboardTypeEnum.CurrentWeek &&
        this.getCurrentWeek()),
      ...(leaderboardQueryDto.type === LeaderboardTypeEnum.LastWeek &&
        this.getLastWeek())
    };

    const cacheKey = "leaderboard/" + leaderboardQueryDto.type;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (!cachedData) {
      const result = await this.statisticsService.getUsersStatistics(args);
      const leaderboard = result
        .map((entry) => ({
          ...entry,
          ...this.calculatePointsAndAvgDifficulty(entry)
        }))
        .sort((a, b) => b.points - a.points)
        .map((entry, i) => ({
          id: i + 1,
          ...entry
        }));

      // keep user ranks in a hash
      if (leaderboardQueryDto.type === LeaderboardTypeEnum.Full) {
        const rankObject: Record<string, string> = {};
        for (let i = 0; i < leaderboard.length; ++i) {
          const username = leaderboard[i].username;
          rankObject[username] = `#${i + 1}`;
        }
        await this.cacheManager.store.client.hSet("ranks", rankObject);
      }

      await this.cacheManager.set(cacheKey, leaderboard, 5 * 60000);
      return leaderboard;
    }

    return cachedData;
  }

  calculatePointsAndAvgDifficulty(entry: {
    totalSolveTime: bigint;
    totalDifficulty: bigint;
    totalSolved: bigint;
    totalSolvedWithDifficulty: bigint;
  }) {
    let averageDifficulty =
      entry.totalSolvedWithDifficulty > 0
        ? Number(entry.totalDifficulty) /
          Number(entry.totalSolvedWithDifficulty)
        : 0;
    let points =
      (Number(entry.totalSolved) * averageDifficulty) / 100 +
      Number(entry.totalSolveTime);
    if (!points) points = 0;
    points = Math.round(points * 1e2) / 1e2;
    averageDifficulty = Math.round(averageDifficulty * 1e2) / 1e2;
    return {
      points,
      averageDifficulty
    };
  }

  private format(moment: Moment) {
    return moment.format("YYYY-MM-DD");
  }

  private getCurrentWeek() {
    // find the last saturday, saturday is considered the week start
    let weekStart = moment(new Date());
    while (weekStart.day() !== 6) weekStart = weekStart.subtract(1, "day");
    return {
      fromDate: this.format(weekStart),
      toDate: this.format(moment())
    };
  }

  private getLastWeek() {
    let weekStart = moment(new Date());
    while (weekStart.day() !== 6) weekStart = weekStart.subtract(1, "day");
    weekStart = weekStart.subtract(7, "days");
    return {
      fromDate: this.format(moment(weekStart)),
      toDate: this.format(weekStart.add(6, "days"))
    };
  }
}
