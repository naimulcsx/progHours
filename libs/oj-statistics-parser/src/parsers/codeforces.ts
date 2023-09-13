import axios from "axios";
import * as _ from "lodash";
import * as moment from "moment";

import {
  StatisticsParser,
  StatisticsParserOpts
} from "../interfaces/StatisticsParser";
import { CodeforcesApiResponse } from "../types/ApiResponse";
import { ParseResult } from "../types/ParseResult";

export class CodeforcesParser implements StatisticsParser {
  private handle: string;

  set({ handle }: StatisticsParserOpts): CodeforcesParser {
    this.handle = handle;
    return this;
  }

  getHandle() {
    return this.handle;
  }

  async fetch() {
    const { data } = await axios.get<CodeforcesApiResponse>(
      `https://codeforces.com/api/user.status?handle=${this.handle}&from=1&count=10000`
    );

    const acceptedSubmissions = data.result.filter(
      (s) => s.verdict === "OK" && s.testset === "TESTS"
    );

    const result: ParseResult = {
      judge: "CODEFORCES",
      totalSolved: acceptedSubmissions.length,
      solvedProblems: _.uniqWith(
        acceptedSubmissions.map(
          ({ id, problem, creationTimeSeconds, contestId }) => ({
            id,
            contestId,
            pid: `CF-${problem.contestId}${problem.index}`,
            name: problem.name,
            url: `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
            solvedAt: moment.unix(creationTimeSeconds).toDate(),
            difficulty: problem.rating || 0,
            tags: problem.tags
          })
        ),
        (a, b) => a.pid === b.pid
      )
    };

    return result;
  }
}
