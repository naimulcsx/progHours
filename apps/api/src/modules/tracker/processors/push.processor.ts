import {
  Processor,
  Process,
  InjectQueue,
  OnQueueCompleted
} from "@nestjs/bull";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { Job } from "bull";

export const TRACKER_PUSH_QUEUE = "tracker_push";
export const InjectTrackerPushQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_PUSH_QUEUE);

@Processor(TRACKER_PUSH_QUEUE)
export class TrackerPushProcessor {
  public parser: OJStatisticsParser;

  constructor(private readonly submissionsService: SubmissionsService) {
    this.parser = new OJStatisticsParser();
  }

  /**
   * Responsible for pushing (storing) individual submission into the database
   */
  @Process()
  async push(
    job: Job<{ userId: number; pid: string; url: string; solvedAt: Date }>
  ) {
    const { userId, url, solvedAt } = job.data;
    // TODO: createdAt and updatedAt should be same as solvedAt
    const submission = await this.submissionsService.create(userId, {
      url,
      solveTime: 0,
      verdict: "AC",
      solvedAt: new Date(solvedAt).toISOString()
    });
    job.progress(100);
    return {
      status: "OK",
      problemId: submission.problemId
    };
  }

  @OnQueueCompleted()
  async onCompleted(
    job: Job<{ userId: number; judge: string; handle: string }>,
    result: {
      status: string;
    }
  ) {
    console.log("result", result);
    console.log("started at", job.processedOn);
    console.log("finished at", job.finishedOn);
    console.log("time taken", job.finishedOn - job.processedOn);
  }
}
