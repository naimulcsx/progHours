import axios from "axios";
import * as _ from "lodash";
import * as moment from "moment";
import {
  StatisticsParser,
  StatisticsParserOpts
} from "../interfaces/StatisticsParser";
import { ParseResult } from "../types/ParseResult";
import { CodeforcesApiResponse } from "../types/ApiResponse";

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
      totalSolved: acceptedSubmissions.length,
      solvedProblems: _.uniqWith(
        acceptedSubmissions.map(
          ({ problem: { contestId, index }, creationTimeSeconds }) => ({
            pid: `CF-${contestId}${index}`,
            url: `https://codeforces.com/contest/${contestId}/problem/${index}`,
            solvedAt: moment.unix(creationTimeSeconds).toDate()
          })
        ),
        (a, b) => a.pid === b.pid
      )
    };

    return result;
  }
}
