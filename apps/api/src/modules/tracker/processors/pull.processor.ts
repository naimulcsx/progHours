import { Job, Queue } from "bull";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, forwardRef } from "@nestjs/common";

import { fetchUserSubmissions } from "@proghours/crawler";

import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { ProblemsService } from "~/modules/problems/services/problems.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

import { InjectTrackerPushQueue } from "./push.processor";

export const TRACKER_PULL_QUEUE = "tracker_pull";

export const InjectTrackerPullQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_PULL_QUEUE);

export type PullJob = Job<{
  userId: number;
  pullHistoryId: string;
  judge: "CODEFORCES" | "CODECHEF";
  handle: string;
}>;

@Processor(TRACKER_PULL_QUEUE)
export class TrackerPullProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly problemsService: ProblemsService,

    @Inject(forwardRef(() => SubmissionsService))
    private readonly submissionsService: SubmissionsService,
    @InjectTrackerPushQueue() private trackerPushQueue: Queue
  ) {}

  /**
   * Pull user submissions (accepted) using online judge handle
   * For each submission, we'll add a new job on the `Tracker_push` queue
   */
  @Process()
  async pull(job: PullJob) {
    const { userId, pullHistoryId, judge, handle } = job.data;

    if (judge === "CODEFORCES") {
      const data = await fetchUserSubmissions("CODEFORCES", {
        handle: handle
      });

      const solvedProblems = data.submissions.filter((s) => s.verdict === "AC");

      // Optimizing for Codeforces API, where we are getting all the problem data
      // So we don't need to make API requests to get the problem information
      for (const { pid, name, difficulty, url, tags } of solvedProblems) {
        await this.problemsService.createProblem({
          pid,
          name,
          difficulty,
          url,
          tags
        });
      }

      // Find new submissions that needs to be pushed into the database
      const items: Array<{ pid: string; url: string; solvedAt: Date }> = [];
      for (const el of solvedProblems) {
        const exists = await this.submissionsService.exists(userId, el.url);
        if (!exists) {
          items.push({
            pid: el.pid,
            url: el.url,
            solvedAt: el.createdAt
          });
        }
      }

      await this.prisma.pullHistory.update({
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
        const pullHistoryItem = await this.prisma.pullHistoryItem.create({
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
    }

    job.progress(100);
    return {
      status: "OK"
    };
  }
}
