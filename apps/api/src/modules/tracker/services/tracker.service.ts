import { createId } from "@paralleldrive/cuid2";
import { Queue } from "bull";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { InjectTrackerPullQueue } from "../processors/pull.processor";
import { InjectTrackerVerifyQueue } from "../processors/verify.processor";

@Injectable()
export class TrackerService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectTrackerPullQueue() private trackerPullQueue: Queue,
    @InjectTrackerVerifyQueue() private trackerVerifyQueue: Queue
  ) {}

  async pull(userId: string) {
    // create a pull history
    const pullHistory = await this.prisma.pullHistory.create({
      data: {
        id: createId(),
        userId
      }
    });

    await this.trackerPullQueue.add(
      {
        userId,
        pullHistoryId: pullHistory.id
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 15000
        }
      }
    );

    return {
      pullHistoryId: pullHistory.id
    };
  }

  async verifyAll(userId: string) {
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
    submissionId: string;
    userId: string;
    url: string;
    judge: "CODEFORCES";
  }) {
    return this.trackerVerifyQueue.add({
      jobType: "VERIFY_SINGLE",
      url,
      userId,
      judge,
      submissionId
    });
  }
}
