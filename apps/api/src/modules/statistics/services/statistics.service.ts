import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "~/modules/prisma/services/prisma.service";

import { LeaderboardEntry, TagsFrequency, UserStatistics } from "../types";

// issue: https://github.com/prisma/studio/issues/614
/* eslint-disable @typescript-eslint/no-explicit-any */
const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function () {
  return Number(this);
};

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsersStatistics(
    query:
      | { type: "full" }
      | { type: "range"; fromDate: string; toDate: string }
  ) {
    const timeFilter =
      query.type === "range"
        ? Prisma.sql`
      AND s.solved_at >= TO_TIMESTAMP(${query.fromDate}, 'YYYY-MM-DD') 
      AND s.solved_at <= TO_TIMESTAMP(${query.toDate}, 'YYYY-MM-DD')
    `
        : Prisma.sql``;
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
          s.verdict = 'AC' ${timeFilter}
      GROUP BY
          u.id
      `;
    return result;
  }

  async getUserStatistics(
    id: number,
    query:
      | { type: "full" }
      | { type: "range"; fromDate: string; toDate: string }
  ) {
    const userId = Prisma.sql`${id}`;
    const timeFilter =
      query.type === "range"
        ? Prisma.sql`
    AND s.solved_at >= TO_TIMESTAMP(${query.fromDate}, 'YYYY-MM-DD') 
    AND s.solved_at <= TO_TIMESTAMP(${query.toDate}, 'YYYY-MM-DD')
  `
        : Prisma.sql``;
    const result: UserStatistics = await this.prisma.$queryRaw`
    SELECT
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
        s.user_id = ${userId} AND s.verdict = 'AC' ${timeFilter}
    `;
    return result[0];
  }

  async getTagsFrequency(id: number) {
    const userId = Prisma.sql`${id}`;
    const result: TagsFrequency = await this.prisma.$queryRaw`
      SELECT
          t.name,
          COUNT(t.name)
      FROM 
          problem_tags AS ptags
      LEFT JOIN tags AS t on ptags.tag_id = t.id
      WHERE
          ptags.problem_id IN (
            SELECT
                p.id
            FROM
                submissions AS s
            LEFT JOIN problems AS p ON s.problem_id = p.id
            WHERE s.user_id = ${userId} AND s.verdict = 'AC'
          )
      GROUP BY
          t.name;
    `;
    return result;
  }

  async getTagsSolveTime(id: number) {
    const userId = Prisma.sql`${id}`;
    const result = await this.prisma.$queryRaw`
      SELECT
        t.name AS tag,
        SUM(s.solve_time) AS "totalSolveTime"
      FROM
        submissions AS s
      LEFT JOIN problems AS p ON s.problem_id = p.id
      LEFT JOIN problem_tags AS ptags ON p.id = ptags.problem_id
      LEFT JOIN tags AS t ON ptags.tag_id = t.id
      
      WHERE
        s.user_id = ${userId} AND s.verdict = 'AC'
      GROUP BY
        t.name
      ORDER BY
        "totalSolveTime"
    `;
    return result;
  }

  async getWeeklyStatistics(id: number) {
    const userId = Prisma.sql`${id}`;
    const result = await this.prisma.$queryRaw`
      SELECT 
          date_trunc('WEEK', (s.solved_at + interval '2 day')) - interval '2 day' AS "weekStartDate",
          COUNT(s.id) AS solved,
          CASE WHEN Count(CASE WHEN p.difficulty > 0 THEN 1 ELSE NULL END) > 0 
              THEN
                  SUM(p.difficulty) / Count(CASE WHEN p.difficulty > 0 THEN 1 ELSE NULL END)
              ELSE
                  0
          END AS "averageDifficulty"
      FROM 
        submissions AS s 
      LEFT JOIN problems as p ON s.problem_id = p.id
      WHERE
        s.user_id = ${userId} AND s.verdict = 'AC'
      GROUP BY 
        date_trunc('WEEK',(s.solved_at + interval '2 day')) - interval '2 day'
      ORDER BY
        "weekStartDate"
    `;
    return result;
  }
}
