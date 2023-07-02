import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";
import { InjectTrackerPullQueue } from "../processors/pull.processor";

@Injectable()
export class TrackerService {
  public statisticParser: OJStatisticsParser;

  constructor(@InjectTrackerPullQueue() private trackerPullQueue: Queue) {
    this.statisticParser = new OJStatisticsParser();
  }

  async pull(userId: number) {
    await this.trackerPullQueue.add({
      userId,
      handle: "tanveerkader",
      judge: "codeforces"
    });
    return {
      status: "OK"
    };
  }
}
