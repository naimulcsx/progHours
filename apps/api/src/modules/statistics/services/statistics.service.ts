import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/modules/prisma/services/prisma.service";
import { LeaderboardEntry } from "../types";

// issue: https://github.com/prisma/studio/issues/614
/* eslint-disable @typescript-eslint/no-explicit-any */
const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function () {
  return Number(this);
};

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getLeaderboard() {
    const result: LeaderboardEntry[] = await this.prisma.$queryRaw`
      SELECT
          u.id AS "userId",
          u.full_name AS "fullName",
          u.username AS "username",
          u.metadata AS "metaData",
          Sum(s.solve_time) AS "totalSolveTime",
          Sum(p.difficulty) AS "totalDifficulty",
          Count(p.id) AS "totalSolved",
          Count(
              CASE WHEN p.difficulty > 0 THEN
                  1
              ELSE
                  NULL
              END) AS "totalSolvedWithDifficulty"
      FROM
          submissions AS s
          LEFT JOIN problems AS p ON s.problem_id = p.id
          LEFT JOIN users AS u ON u.id = s.user_id
      WHERE
          s.verdict = 'AC'
      GROUP BY
          u.id
      `;
    return result;
  }
}
