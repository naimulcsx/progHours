import { Job, Queue } from "bull";
import { uniqBy } from "lodash";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { fetchUserSubmissions } from "@proghours/crawler";

import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { ProblemsService } from "~/modules/problems/services/problems.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

import { InjectTrackerVerifyQueue } from "./verify.processor";

export const TRACKER_RETRIEVE_QUEUE = "tracker_retrieve";

export const InjectTrackerRetrieveQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_RETRIEVE_QUEUE);

export type RetrieveJob = Job<{
  userId: string;
  retrieveHistoryId: string;
}>;

@Processor(TRACKER_RETRIEVE_QUEUE)
export class TrackerRetrieveProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly problemsService: ProblemsService,
    private readonly configService: ConfigService,

    @Inject(forwardRef(() => SubmissionsService))
    private readonly submissionsService: SubmissionsService,
    @InjectTrackerVerifyQueue() private verifyQueue: Queue
  ) {}

  /**
   * Retrieve user submissions (accepted) using online judge handle
   * For each submission, we'll add a new job on the `Tracker_push` queue
   */
  @Process()
  async pull(job: RetrieveJob) {
    const { userId, retrieveHistoryId } = job.data;

    // Submissions that are new for this pull history
    const items: Array<{
      url: string;
      createdAt: string;
      problemName: string;
      judge: "CODEFORCES" | "CODECHEF";
    }> = [];

    // If for any reason the submission fails
    const failedItems: string[] = [];

    // Retrieve started
    await this.prisma.retrieveHistory.update({
      where: { id: retrieveHistoryId },
      data: { status: "STARTED" }
    });

    // Get User Handles
    const userHandles = await this.prisma.userHandle.findMany({
      where: {
        userId
      }
    });

    // Find Codeforces Handle
    const codeforcesHandle = userHandles.find(
      (userHandle) => userHandle.type === "CODEFORCES"
    );

    if (codeforcesHandle) {
      const { submissions } = await fetchUserSubmissions("CODEFORCES", {
        handle: codeforcesHandle.handle
      });

      // Find out the solved problems
      const solvedProblems = uniqBy(
        submissions.filter((s) => s.verdict === "AC"),
        (s) => s.url
      );

      // Optimizing for Codeforces API, where we are getting all the problem data
      // So we don't need to make API requests to get the problem information
      for (const { pid, name, difficulty, url, tags } of solvedProblems) {
        const problem = await this.problemsService.getByUrl(url);
        if (!problem) {
          try {
            await this.problemsService.createProblem({
              pid,
              name,
              difficulty,
              url,
              tags
            });
          } catch {
            // Find out the failed problems
            job.log(`${pid}`);
          }
        }
      }

      // Find out problems that were not solved previosuly by the user
      const newItems: Array<{
        url: string;
        createdAt: string;
      }> = [];

      for (const el of solvedProblems) {
        const sub = await this.submissionsService.getByUserAndUrl(
          userId,
          el.url
        );
        if (!sub) {
          newItems.push({
            url: el.url,
            createdAt: el.createdAt.toISOString()
          });
        }
      }

      // Create submissions for the user
      for (const { url, createdAt } of newItems) {
        try {
          const sub = await this.submissionsService.create(userId, {
            url,
            solveTime: 0,
            verdict: "AC",
            solvedAt: new Date(createdAt).toISOString()
          });
          items.push({
            url,
            createdAt,
            problemName: sub.problem.name,
            judge: "CODEFORCES"
          });
        } catch {
          failedItems.push(url);
        }
      }

      // Retrieve finished
      await this.prisma.retrieveHistory.update({
        where: {
          id: retrieveHistoryId
        },
        data: {
          totalCompleted: items.length - failedItems.length,
          totalItems: items.length,
          items: items,
          status: "PULLED"
        }
      });
    }

    // Find CodeChef Handle
    const codeChefHandle = userHandles.find(
      (userHandle) => userHandle.type === "CODECHEF"
    );

    // For CodeChef
    if (codeChefHandle) {
      const { submissions } = await fetchUserSubmissions("CODECHEF", {
        handle: codeChefHandle.handle,
        clientId: this.configService.get("codechef.clientId"),
        secret: this.configService.get("codechef.secret")
      });

      // Find out the solved problems
      const solvedProblems = uniqBy(
        submissions.filter((s) => s.verdict === "AC"),
        (s) => s.url
      );

      const newItems: Array<{
        url: string;
        createdAt: string;
      }> = [];

      for (const el of solvedProblems) {
        const sub = await this.submissionsService.getByUserAndUrl(
          userId,
          el.url
        );
        if (!sub) {
          newItems.push({
            url: el.url,
            createdAt: el.createdAt.toISOString()
          });
        }
      }

      for (const { url, createdAt } of newItems) {
        // If the problem is not in our database, we don't need to worry
        // it'll be automatically created by the submissions service
        try {
          const sub = await this.submissionsService.create(userId, {
            url,
            solveTime: 0,
            verdict: "AC",
            solvedAt: new Date(createdAt).toISOString()
          });
          items.push({
            url,
            createdAt,
            problemName: sub.problem.name,
            judge: "CODECHEF"
          });
        } catch {
          failedItems.push(url);
        }
      }
    }

    // add verify task to verify queue
    await this.verifyQueue.add(
      { jobType: "VERIFY_ALL", userId },
      { delay: 30000 }
    );

    // Retrieve finished
    await this.prisma.retrieveHistory.update({
      where: {
        id: retrieveHistoryId
      },
      data: {
        totalCompleted: items.length - failedItems.length,
        totalItems: items.length,
        items: items,
        status: "PULLED",
        processingTime: Date.now() - job.processedOn
      }
    });

    job.progress(100);
    return {
      status: "OK",
      failedItems,
      duration: `${(-job.processedOn / 1000).toFixed(2)}s`
    };
  }
}
