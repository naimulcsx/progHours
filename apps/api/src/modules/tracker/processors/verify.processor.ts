import axios from "axios";
import { Job } from "bull";
import moment from "moment";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Inject, forwardRef } from "@nestjs/common";

import { CodeforcesParser } from "@proghours/oj-problem-parser";
import { OJStatisticsParser } from "@proghours/oj-statistics-parser";

import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { SubmissionsService } from "~/modules/submissions/services/submissions.service";

import { VerifyService } from "../services/verify.service";

export const TRACKER_VERIFY_QUEUE = "tracker_verify";
export const InjectTrackerVerifyQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_VERIFY_QUEUE);

type VerifySingleData = {
  jobType: "VERIFY_SINGLE";
  url: string;
  userId: number;
  judge: "CODEFORCES";
  submissionId: number;
};

type VerifyAllData = {
  jobType: "VERIFY_ALL";
  userId: number;
};

type VerifyJob = Job<VerifySingleData | VerifyAllData>;

@Processor(TRACKER_VERIFY_QUEUE)
export class TrackerVerifyProcessor {
  public statisticsParser: OJStatisticsParser;
  constructor(
    private readonly verifyService: VerifyService,
    @Inject(forwardRef(() => SubmissionsService))
    private readonly submissionsService: SubmissionsService,
    private readonly prisma: PrismaService
  ) {
    this.statisticsParser = new OJStatisticsParser();
  }

  @Process()
  async verify(job: VerifyJob) {
    const { jobType } = job.data;

    // verify single user submission
    if (jobType === "VERIFY_SINGLE") {
      const result = await this.verifySingle(job.data);
      job.progress(100);
      return result;
    }

    // verify all user sumbissions
    else if (jobType === "VERIFY_ALL") {
      const result = await this.verifyAll(job.data);
      job.progress(100);
      return result;
    }

    return {
      status: "_OK_"
    };
  }

  async verifySingle(data: VerifySingleData) {
    const { userId, url, judge, submissionId } = data;

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

    const cfParser = new CodeforcesParser();
    const params = cfParser.getUrlParams(url);

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

    return {
      status: "OK"
    };
  }

  async verifyAll(data: VerifyAllData) {
    const { userId } = data;

    // make all submissions unverified
    await this.prisma.submission.updateMany({
      where: { userId },
      data: { isVerified: false, metaData: {} }
    });

    // cfUserHandle
    const cfUserHandle = await this.prisma.userHandle.findUnique({
      where: {
        userId_type: {
          userId,
          type: "CODEFORCES"
        }
      }
    });

    if (!cfUserHandle) {
      return {
        status: "HANDLE_NOT_FOUND"
      };
    }

    const cfData = await this.statisticsParser.parse({
      judge: "codeforces",
      handle: cfUserHandle.handle
    });

    if (cfData.judge === "CODEFORCES") {
      await this.verifyService.verifyCodeforcesSubmissions(userId, cfData);
    }

    return {
      status: "OK"
    };
  }
}
