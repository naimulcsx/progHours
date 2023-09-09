import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

import { OJStatisticsParser } from "@proghours/oj-statistics-parser";

export const TRACKER_VERIFY_QUEUE = "tracker_verify";
export const InjectTrackerVerifyQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_VERIFY_QUEUE);

type VerifyJob = Job<{
  userId: number;
}>;

@Processor(TRACKER_VERIFY_QUEUE)
export class TrackerVerifyProcessor {
  public statisticsParser: OJStatisticsParser;
  constructor(private readonly submissionsService: SubmissionsService) {
    this.statisticsParser = new OJStatisticsParser();
  }

  @Process()
  async verify(job: VerifyJob) {
    const data = await this.statisticsParser.parse({
      judge: "codeforces",
      handle: "naimulcsx"
    });

    const results = await Promise.all(
      data.solvedProblems.map((el: { url: string }) =>
        this.submissionsService.getByUserIdAndUrl(job.data.userId, el.url)
      )
    );
    const submissionsToUpdate = results.filter((el) => el !== null);

    const res = await Promise.all(
      submissionsToUpdate.map((el) =>
        this.submissionsService.markVerified(el.id)
      )
    );

    console.log(res);
    job.progress(100);
    return {
      status: "ok"
    };
  }
}
