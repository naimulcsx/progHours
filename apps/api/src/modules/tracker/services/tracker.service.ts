import { Queue } from "bull";

import { Injectable } from "@nestjs/common";

import { OJStatisticsParser } from "@proghours/oj-statistics-parser";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { InjectTrackerPullQueue } from "../processors/pull.processor";
import { InjectTrackerVerifyQueue } from "../processors/verify.processor";

@Injectable()
export class TrackerService {
  public statisticParser: OJStatisticsParser;

  constructor(
    private readonly prisma: PrismaService,
    @InjectTrackerPullQueue() private trackerPullQueue: Queue,
    @InjectTrackerVerifyQueue() private trackerVerifyQueue: Queue
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
        handle: "naimulcsx",
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

  async verifyAll(userId: number) {
    return this.trackerVerifyQueue.add({
      jobType: "VERIFY_ALL",
      userId
    });
  }

  async verifySingle({
    submissionId,
    userId,
    url,
    judge
  }: {
    submissionId: number;
    userId: number;
    url: string;
    judge: "CODEFORCES";
  }) {
    return this.trackerVerifyQueue.add({
      url,
      jobType: "VERIFY_SINGLE",
      userId,
      judge,
      submissionId
    });
  }
}
