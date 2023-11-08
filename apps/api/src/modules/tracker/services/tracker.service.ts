import { createId } from "@paralleldrive/cuid2";
import { Queue } from "bull";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { InjectTrackerRetrieveQueue } from "../processors/retrieve.processor";
import { InjectTrackerVerifyQueue } from "../processors/verify.processor";

@Injectable()
export class TrackerService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectTrackerRetrieveQueue() private trackerRetrieveQueue: Queue,
    @InjectTrackerVerifyQueue() private trackerVerifyQueue: Queue
  ) {}

  async retrieve(userId: string) {
    const retrieveHistory = await this.prisma.retrieveHistory.create({
      data: {
        id: createId(),
        userId
      }
    });
    await this.trackerRetrieveQueue.add(
      {
        userId,
        retrieveHistoryId: retrieveHistory.id
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
      retrieveHistoryId: retrieveHistory.id
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
