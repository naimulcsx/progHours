import { groupBy } from "lodash";

import { Injectable } from "@nestjs/common";

import { CcSubmissions, CfSubmissions } from "@proghours/crawler";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

@Injectable()
export class VerifyService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyCodeforcesSubmission(
    submissionId: number,
    pid: string,
    data: CfSubmissions
  ) {
    const groupedData = groupBy(data.submissions, (s) => s.pid);
    const submissions = groupedData[pid];

    // prettier-ignore
    let acCount = 0, waCount = 0, ceCount = 0, tleCount = 0, skCount = 0, 
    reCount = 0, mleCount = 0, hckCount = 0, othCount = 0;

    for (const s of submissions) {
      if (s.verdict === "AC") acCount++;
      else if (s.verdict === "WA") waCount++;
      else if (s.verdict === "CE") ceCount++;
      else if (s.verdict === "TLE") tleCount++;
      else if (s.verdict === "SK") skCount++;
      else if (s.verdict === "RE") reCount++;
      else if (s.verdict === "MLE") mleCount++;
      else if (s.verdict === "HCK") hckCount++;
      else othCount++;
    }

    await this.prisma.submission.update({
      where: {
        id: submissionId
      },
      data: {
        acCount,
        waCount,
        ceCount,
        tleCount,
        skCount,
        reCount,
        mleCount,
        hckCount,
        othCount,
        verdict: acCount > 0 ? "AC" : "WA",
        isVerified: true,
        metaData: {
          submissions: submissions.map(
            ({ id, pid, contestId, verdict, createdAt }) => ({
              id,
              pid,
              verdict,
              createdAt,
              url: `https://codeforces.com/contest/${contestId}/submission/${id}`
            })
          )
        }
      }
    });
  }

  async verifyCodeforcesSubmissions(userId: string, data: CfSubmissions) {
    const groupedData = groupBy(data.submissions, (s) => s.pid);

    for (const pid in groupedData) {
      const submissions = groupedData[pid];
      if (submissions.length === 0) continue;

      const problem = await this.prisma.problem.findUnique({
        where: { url: submissions[0].url }
      });

      if (!problem) continue; // skip if the problem is not found
      const submission = await this.prisma.submission.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId: problem.id
          }
        }
      });

      // prettier-ignore
      let acCount = 0, waCount = 0, ceCount = 0, tleCount = 0, skCount = 0, 
          reCount = 0, mleCount = 0, hckCount = 0, othCount = 0;

      for (const s of submissions) {
        if (s.verdict === "AC") acCount++;
        else if (s.verdict === "WA") waCount++;
        else if (s.verdict === "CE") ceCount++;
        else if (s.verdict === "TLE") tleCount++;
        else if (s.verdict === "SK") skCount++;
        else if (s.verdict === "RE") reCount++;
        else if (s.verdict === "MLE") mleCount++;
        else if (s.verdict === "HCK") hckCount++;
        else othCount++;
      }

      if (submission) {
        await this.prisma.submission.update({
          where: { id: submission.id },
          data: {
            acCount,
            waCount,
            ceCount,
            tleCount,
            skCount,
            reCount,
            mleCount,
            hckCount,
            othCount,
            verdict: acCount > 0 ? "AC" : "WA",
            isVerified: true,
            metaData: {
              submissions: submissions.map(
                ({ id, pid, contestId, verdict, createdAt }) => ({
                  id,
                  pid,
                  verdict,
                  createdAt,
                  url: `https://codeforces.com/contest/${contestId}/submission/${id}`
                })
              )
            }
          }
        });
      }
    }
  }

  async verifyCodeChefSubmission(
    submissionId: number,
    pid: string,
    data: CcSubmissions
  ) {
    const groupedData = groupBy(data.submissions, (s) => s.pid);
    const submissions = groupedData[pid];

    // prettier-ignore
    let acCount = 0, waCount = 0, ceCount = 0, tleCount = 0, skCount = 0, 
    reCount = 0, mleCount = 0, hckCount = 0, othCount = 0;

    for (const s of submissions) {
      if (s.verdict === "AC") acCount++;
      else if (s.verdict === "WA") waCount++;
      else if (s.verdict === "CE") ceCount++;
      else if (s.verdict === "TLE") tleCount++;
      else if (s.verdict === "SK") skCount++;
      else if (s.verdict === "RE") reCount++;
      else if (s.verdict === "MLE") mleCount++;
      else if (s.verdict === "HCK") hckCount++;
      else othCount++;
    }

    await this.prisma.submission.update({
      where: { id: submissionId },
      data: {
        acCount,
        waCount,
        ceCount,
        tleCount,
        skCount,
        reCount,
        mleCount,
        hckCount,
        othCount,
        verdict: acCount > 0 ? "AC" : "WA",
        isVerified: true,
        metaData: {
          submissions: submissions.map(({ id, pid, verdict, createdAt }) => ({
            id,
            pid,
            verdict,
            createdAt,
            url: `https://www.codechef.com/viewsolution/${id}`
          }))
        }
      }
    });
  }

  async verifyCodeChefSubmissions(userId: string, data: CcSubmissions) {
    const groupedData = groupBy(data.submissions, (s) => s.pid);

    for (const pid in groupedData) {
      const submissions = groupedData[pid];
      if (submissions.length === 0) continue;

      const problem = await this.prisma.problem.findUnique({
        where: { url: submissions[0].url }
      });

      if (!problem) continue; // skip if the problem is not found
      const submission = await this.prisma.submission.findUnique({
        where: {
          userId_problemId: {
            userId,
            problemId: problem.id
          }
        }
      });

      // prettier-ignore
      let acCount = 0, waCount = 0, ceCount = 0, tleCount = 0, skCount = 0, 
          reCount = 0, mleCount = 0, hckCount = 0, othCount = 0;

      for (const s of submissions) {
        if (s.verdict === "AC") acCount++;
        else if (s.verdict === "WA") waCount++;
        else if (s.verdict === "CE") ceCount++;
        else if (s.verdict === "TLE") tleCount++;
        else if (s.verdict === "SK") skCount++;
        else if (s.verdict === "RE") reCount++;
        else if (s.verdict === "MLE") mleCount++;
        else if (s.verdict === "HCK") hckCount++;
        else othCount++;
      }

      if (submission) {
        await this.prisma.submission.update({
          where: { id: submission.id },
          data: {
            acCount,
            waCount,
            ceCount,
            tleCount,
            skCount,
            reCount,
            mleCount,
            hckCount,
            othCount,
            verdict: acCount > 0 ? "AC" : "WA",
            isVerified: true,
            metaData: {
              submissions: submissions.map(
                ({ id, pid, verdict, createdAt }) => ({
                  id,
                  pid,
                  verdict,
                  createdAt,
                  url: `https://www.codechef.com/viewsolution/${id}`
                })
              )
            }
          }
        });
      }
    }
  }
}
