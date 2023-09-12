import axios from "axios";
import { Job } from "bull";
import moment from "moment";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, forwardRef } from "@nestjs/common";

import { CodeforcesParser } from "@proghours/oj-problem-parser";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";

import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

export const TRACKER_VERIFY_QUEUE = "tracker_verify";
export const InjectTrackerVerifyQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_VERIFY_QUEUE);

type VerifyJob = Job<{
  url: string;
  type: "SINGLE";
  userId: number;
  judge: "CODEFORCES";
  submissionId: number;
}>;

@Processor(TRACKER_VERIFY_QUEUE)
export class TrackerVerifyProcessor {
  public statisticsParser: OJStatisticsParser;
  constructor(
    @Inject(forwardRef(() => SubmissionsService))
    private readonly submissionsService: SubmissionsService,
    private readonly prisma: PrismaService
  ) {
    this.statisticsParser = new OJStatisticsParser();
  }

  @Process()
  async verify(job: VerifyJob) {
    const { userId, url, judge, submissionId } = job.data;

    const userHandle = await this.prisma.userHandle.findUnique({
      where: {
        userId_type: {
          userId,
          type: judge
        }
      }
    });

    if (!userHandle) {
      return {
        status: "HANDLE_NOT_FOUND"
      };
    }

    const cfParser = new CodeforcesParser(url);
    const params = cfParser.getUrlParams();

    if (!("groupId" in params)) {
      const response = await axios.get<{
        result: Array<{
          id: number;
          creationTimeSeconds: number;
          problem: { index: string };
          author: { participantType: string };
          verdict: string;
        }>;
      }>(
        `https://codeforces.com/api/contest.status?contestId=${params.contestId}&handle=${userHandle.handle}`
      );
      response.data.result.reverse();
      const solvedIndex = response.data.result.findIndex(
        (el) => el.problem.index === params.problemId && el.verdict === "OK"
      );
      if (solvedIndex !== -1) {
        const { id, creationTimeSeconds } = response.data.result[solvedIndex];

        await this.prisma.submission.update({
          where: { id: submissionId },
          data: {
            isVerified: true,
            solvedAt: moment.unix(creationTimeSeconds).toDate(),
            metaData: {
              submissionUrl: `https://codeforces.com/contest/${params.contestId}/submission/${id}`
            }
          }
        });
      }
    }

    job.progress(100);
    return {
      status: "OK"
    };
  }
}
