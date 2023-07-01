import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

@Injectable()
export class TrackerService {
  public statisticParser: OJStatisticsParser;

  constructor(
    @InjectQueue("submissions") private submissionsQueue: Queue,
    private readonly submissionsService: SubmissionsService
  ) {
    this.statisticParser = new OJStatisticsParser();
  }

  async pull(userId: number) {
    const data = await this.statisticParser.parse({
      judge: "codeforces",
      handle: "tanveerkader"
    });
    for (const el of data.solvedProblems) {
      const exists = await this.submissionsService.exists(userId, el.url);
      if (!exists) {
        await this.submissionsQueue.add({
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
