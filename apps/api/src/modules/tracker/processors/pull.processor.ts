import { Processor, Process, InjectQueue } from "@nestjs/bull";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { Job, Queue } from "bull";
import { InjectTrackerPushQueue } from "./push.processor";

export const TRACKER_PULL_QUEUE = "tracker_pull";
export const InjectTrackerPullQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_PULL_QUEUE);

@Processor(TRACKER_PULL_QUEUE)
export class TrackerPullProcessor {
  public parser: OJStatisticsParser;

  constructor(
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
  async pull(job: Job<{ userId: number; judge: string; handle: string }>) {
    const { userId, judge, handle } = job.data;
    const data = await this.parser.parse({
      judge,
      handle
    });
    for (const el of data.solvedProblems) {
      const exists = await this.submissionsService.exists(userId, el.url);
      if (!exists) {
        await this.trackerPushQueue.add({
          userId,
          ...el
        });
      }
    }
    return {
      status: "OK"
    };
  }
}
