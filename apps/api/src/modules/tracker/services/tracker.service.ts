import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { InjectTrackerPullQueue } from "../processors/pull.processor";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class TrackerService {
  public statisticParser: OJStatisticsParser;

  constructor(
    private readonly prisma: PrismaService,
    @InjectTrackerPullQueue() private trackerPullQueue: Queue
  ) {
    this.statisticParser = new OJStatisticsParser();
  }

  async pull(userId: number) {
    const pullHistory = await this.prisma.pullHistory.create({
      data: {
        userId
      }
    });
    await this.trackerPullQueue.add(
      {
        userId,
        pullHistoryId: pullHistory.id,
        handle: "tanveerkader",
        judge: "codeforces"
      },
      {
        attempts: 5,
        backoff: 5000
      }
    );
    return {
      status: "OK",
      pullHistoryId: pullHistory.id
    };
  }
}
