import {
  Processor,
  Process,
  InjectQueue,
  OnQueueCompleted
} from "@nestjs/bull";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { Job } from "bull";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

export const TRACKER_PUSH_QUEUE = "tracker_push";
export const InjectTrackerPushQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_PUSH_QUEUE);

export type PushJob = Job<{
  userId: number;
  pullHistoryId: string;
  pullHistoryItemId: number;
  pid: string;
  url: string;
  solvedAt: Date;
  isLastItem: boolean;
}>;

@Processor(TRACKER_PUSH_QUEUE)
export class TrackerPushProcessor {
  public parser: OJStatisticsParser;

  constructor(
    private readonly prisma: PrismaService,
    private readonly submissionsService: SubmissionsService
  ) {
    this.parser = new OJStatisticsParser();
  }

  /**
   * Responsible for pushing (storing) individual submission into the database
   */
  @Process()
  async push(job: PushJob) {
    const { userId, url, solvedAt, pullHistoryItemId } = job.data;

    // Throwing randomly to test failed attempts
    // const number = Math.floor(Math.random() * 10) + 1;
    // if (number == 1) {
    //   throw Error("Throwing randomly to test failed attempts!");
    // }

    // TODO: createdAt and updatedAt should be same as solvedAt
    const submission = await this.submissionsService.create(userId, {
      url,
      solveTime: 0,
      verdict: "AC",
      solvedAt: new Date(solvedAt).toISOString()
    });

    /** TEST */
    const _ = await this.prisma.pullHistoryItem.findUnique({
      where: { id: pullHistoryItemId }
    });
    if (!_) {
      console.log("NOT FOUND", pullHistoryItemId);
    }

    // update pull history item
    await this.prisma.pullHistoryItem.update({
      where: {
        id: pullHistoryItemId
      },
      data: {
        status: "STARTED",
        problemId: submission.problemId
      }
    });
    job.progress(100);
    return {
      status: "OK",
      pullHistoryItemId
    };
  }

  @OnQueueCompleted()
  async onCompleted(job: PushJob) {
    const { pullHistoryId, pullHistoryItemId } = job.data;
    const pullHistory = await this.prisma.pullHistory.findUnique({
      where: { id: pullHistoryId }
    });
    const processingTime = BigInt(job.finishedOn) - BigInt(job.processedOn);
    await this.prisma.pullHistory.update({
      where: {
        id: pullHistoryId
      },
      data: {
        totalCompleted: pullHistory.totalCompleted + 1,
        status:
          pullHistory.totalCompleted + 1 === pullHistory.totalItems
            ? "OK"
            : "STARTED",
        processingTime: pullHistory.processingTime + processingTime
      }
    });

    /** TEST */
    const _ = await this.prisma.pullHistoryItem.findUnique({
      where: { id: pullHistoryItemId }
    });
    if (!_) {
      console.log("NOT FOUND", pullHistoryItemId);
    }

    await this.prisma.pullHistoryItem.update({
      where: {
        id: pullHistoryItemId
      },
      data: {
        status: "OK",
        processingTime: processingTime
      }
    });
  }
}
