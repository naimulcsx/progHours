import { Verdict } from "@prisma/client";
import axios from "axios";
import * as _ from "lodash";
import * as moment from "moment";

import { StatisticsParser } from "../interfaces/StatisticsParser";
import { CodeforcesApiResponse } from "../types/ApiResponse";

export type CodeforcesParseResult = {
  judge: "CODEFORCES";
  totalSolved: number;
  solvedProblems: Array<{
    id: number;
    pid: string;
    name: string;
    url: string;
    contestId: number;
    difficulty: number;
    tags: string[];
    solvedAt: Date;
  }>;
  submissions: Array<{
    id: number;
    pid: string;
    name: string;
    url: string;
    contestId: number;
    difficulty: number;
    tags: string[];
    createdAt: Date;
    verdict: Verdict;
  }>;
};

export class CodeforcesParser extends StatisticsParser<CodeforcesParseResult> {
  async parse() {
    const { data } = await axios.get<CodeforcesApiResponse>(
      `https://codeforces.com/api/user.status?handle=${this.handle}&from=1&count=10000`
    );
    const submissions = data.result.map(
      ({ id, problem, creationTimeSeconds, contestId, verdict }) => {
        let _verdict: Verdict = "AC";

        switch (verdict) {
          case "OK":
            _verdict = "AC";
            break;
          case "WRONG_ANSWER":
            _verdict = "WA";
            break;
          case "COMPILATION_ERROR":
            _verdict = "CE";
            break;
          case "SKIPPED":
            _verdict = "SK";
            break;
          case "RUNTIME_ERROR":
            _verdict = "RE";
            break;
          case "TIME_LIMIT_EXCEEDED":
            _verdict = "TLE";
            break;
          case "CHALLENGED":
            _verdict = "HCK";
            break;
          case "MEMORY_LIMIT_EXCEEDED":
            _verdict = "MLE";
            break;
          default:
            _verdict = "OTH";
        }

        return {
          id,
          contestId,
          pid: `CF-${problem.contestId}${problem.index}`,
          name: problem.name,
          url: `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
          createdAt: moment.unix(creationTimeSeconds).toDate(),
          difficulty: problem.rating || 0,
          tags: problem.tags,
          verdict: _verdict
        };
      }
    );

    const acceptedSubmissions = submissions.filter((s) => s.verdict === "AC");

    const result: CodeforcesParseResult = {
      judge: "CODEFORCES",
      totalSolved: acceptedSubmissions.length,
      submissions,
      solvedProblems: _.uniqWith(
        acceptedSubmissions.map(({ createdAt, ...rest }) => ({
          ...rest,
          solvedAt: createdAt
        })),
        (a, b) => a.pid === b.pid
      )
    };

    return result;
  }
}
