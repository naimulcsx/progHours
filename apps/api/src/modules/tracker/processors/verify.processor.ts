import { Job } from "bull";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";

import {
  CcSubmissions,
  CfSubmissions,
  CodeforcesCrawler,
  fetchUserSubmissions
} from "@proghours/crawler";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { VerifyService } from "../services/verify.service";

export const TRACKER_VERIFY_QUEUE = "tracker_verify";
export const InjectTrackerVerifyQueue = (): ParameterDecorator =>
  InjectQueue(TRACKER_VERIFY_QUEUE);

type VerifySingleData = {
  jobType: "VERIFY_SINGLE";
  url: string;
  userId: number;
  judge: "CODEFORCES" | "CODECHEF";
  submissionId: number;
};

type VerifyAllData = {
  jobType: "VERIFY_ALL";
  userId: number;
};

type VerifyJob = Job<VerifySingleData | VerifyAllData>;

@Processor(TRACKER_VERIFY_QUEUE)
export class TrackerVerifyProcessor {
  constructor(
    private readonly verifyService: VerifyService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  @Process()
  async verify(job: VerifyJob) {
    const { jobType } = job.data;

    // verify single user submission
    if (jobType === "VERIFY_SINGLE") {
      const result = await this.verifySingle(job.data);
      job.progress(100);
      return {
        ...result,
        duration: `${((Date.now() - job.processedOn) / 1000).toFixed(2)}s`
      };
    }

    // verify all user sumbissions
    else if (jobType === "VERIFY_ALL") {
      const result = await this.verifyAll(job.data);
      job.progress(100);
      return {
        ...result,
        duration: `${((Date.now() - job.processedOn) / 1000).toFixed(2)}s`
      };
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

    if (judge === "CODEFORCES") {
      const crawler = new CodeforcesCrawler();
      const { type, contestId, problemId } = crawler.getUrlParams(url);
      const pid = `CF-${contestId}${problemId}`;
      if (type === "group_url") {
        return {
          status: "SKIPPED"
        };
      }
      const { data } = await fetchUserSubmissions({
        judge,
        handle: userHandle.handle,
        contestId
      });
      await this.verifyService.verifyCodeforcesSubmission(
        submissionId,
        pid,
        data as CfSubmissions
      );
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

    // get user handles
    const userHandles = await this.prisma.userHandle.findMany({
      where: {
        userId: data.userId
      }
    });

    for (const userHandle of userHandles) {
      const handle = userHandle.handle;

      if (userHandle.type === "CODEFORCES") {
        const { data } = await fetchUserSubmissions({
          judge: "CODEFORCES",
          handle
        });
        await this.verifyService.verifyCodeforcesSubmissions(
          userId,
          data as CfSubmissions
        );
      } else if (userHandle.type === "CODECHEF") {
        const res = await fetchUserSubmissions(
          {
            judge: "CODECHEF",
            handle
          },
          {
            clientId: this.configService.getOrThrow("codechef.clientId"),
            secret: this.configService.getOrThrow("codechef.secret")
          }
        );
        await this.verifyService.verifyCodeChefSubmissions(
          userId,
          res.data as CcSubmissions
        );
      }
    }

    return {
      status: "OK"
    };
  }
}
