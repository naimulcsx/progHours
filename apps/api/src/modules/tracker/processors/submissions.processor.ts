import { Processor, Process } from "@nestjs/bull";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";
import { Job } from "bull";

@Processor("submissions")
export class SubmissionsProcessor {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Process()
  async transcode(
    job: Job<{ userId: number; pid: string; url: string; solvedAt: Date }>
  ) {
    const { userId, url, solvedAt } = job.data;
    console.log(solvedAt);
    // TODO: createdAt and updatedAt should be same as solvedAt
    await this.submissionsService.create(userId, {
      url,
      solveTime: 0,
      verdict: "AC",
      solvedAt: new Date(solvedAt).toISOString()
    });
    job.progress(100);
    return {
      status: "OK"
    };
  }
}
