import { Injectable } from "@nestjs/common";
import { StatisticsService } from "~/modules/statistics/services/statistics.service";

@Injectable()
export class LeaderboardService {
  constructor(private readonly statisticsService: StatisticsService) {}

  async getLeaderboard() {
    return this.statisticsService.getLeaderboard();
  }
}
