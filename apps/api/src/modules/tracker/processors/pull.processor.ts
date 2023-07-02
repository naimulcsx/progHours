import { Processor, Process, InjectQueue } from "@nestjs/bull";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { Job, Queue } from "bull";
import { InjectTrackerPushQueue } from "./push.processor";
import { PrismaService } from "~/modules/prisma/services/prisma.service";

export const TRACKER_PULL_QUEUE = "tracker_pull";
export const InjectTrackerPullQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_PULL_QUEUE);

export type PullJob = Job<{
  userId: number;
  pullHistoryId: string;
  judge: string;
  handle: string;
}>;

@Processor(TRACKER_PULL_QUEUE)
export class TrackerPullProcessor {
  public parser: OJStatisticsParser;

  constructor(
    private readonly prisma: PrismaService,
    private readonly submissionsService: SubmissionsService,
    @InjectTrackerPushQueue() private trackerPushQueue: Queue
  ) {
    this.parser = new OJStatisticsParser();
  }

  /**
   * Pull user submissions (accepted) using online judge handle
   * For each submission, we'll add a new job on the `Tracker_push` queue
   */
  @Process()
  async pull(job: PullJob) {
    const { userId, pullHistoryId, judge, handle } = job.data;
    const data = await this.parser.parse({
      judge,
      handle
    });

    const items: typeof data.solvedProblems = [];

    for (const el of data.solvedProblems) {
      const exists = await this.submissionsService.exists(userId, el.url);
      if (!exists) {
        items.push(el);
      }
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.pullHistory.update({
        where: {
          id: pullHistoryId
        },
        data: {
          totalItems: items.length,
          status: items.length === 0 ? "OK" : "STARTED"
        }
      });

      // add to the push queue
      for (const el of items) {
        const pullHistoryItem = await tx.pullHistoryItem.create({
          data: {
            problemUrl: el.url,
            pullHistoryId
          }
        });
        await this.trackerPushQueue.add(
          {
            userId,
            pullHistoryId,
            pullHistoryItemId: pullHistoryItem.id,
            ...el
          },
          {
            attempts: 5,
            backoff: 5000
          }
        );
      }
    });

    return {
      status: "OK"
    };
  }
}
