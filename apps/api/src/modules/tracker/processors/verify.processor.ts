import axios from "axios";
import { Job } from "bull";
import { RedisCache } from "cache-manager-redis-yet";
import moment from "moment";

import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { CodeforcesParser } from "@proghours/oj-problem-parser";
import {
  CodeChefParser as CodeChefStatisticsParser,
  CodeforcesParser as CodeforcesStatisticsParser
} from "@proghours/oj-statistics-parser";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

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
  constructor(
    private readonly verifyService: VerifyService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache
  ) {}

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

    if (params.type !== "group_url") {
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

    // get user handles
    const userHandles = await this.prisma.userHandle.findMany({
      where: {
        userId: data.userId
      }
    });

    for (const userHandle of userHandles) {
      // codeforces
      if (userHandle.type === "CODEFORCES") {
        const parser = new CodeforcesStatisticsParser();
        parser.setHandle(userHandle.handle);
        const data = await parser.parse();
        await this.verifyService.verifyCodeforcesSubmissions(userId, data);
      }

      // codechef
      else if (userHandle.type === "CODECHEF") {
        const parser = new CodeChefStatisticsParser();
        parser.setHandle(userHandle.handle);

        // set api keys
        parser.setApiKey({
          clientId: this.configService.getOrThrow("codechef.clientId"),
          secret: this.configService.getOrThrow("codechef.secret")
        });

        // get token
        let token: string = await this.cacheManager.get("codechef_token");
        if (!token) {
          token = await parser.getToken();
          const CACHE_TTL = 15 * 60 * 1000; // 15 min
          await this.cacheManager.set("codechef_token", token, CACHE_TTL);
        }

        // set token
        parser.setToken(token);

        // get data
        const data = await parser.parse();
        await this.verifyService.verifyCodeChefSubmissions(userId, data);
      }
    }

    return {
      status: "OK"
    };
  }
}
