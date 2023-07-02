import { StatisticsParser } from "../core/StatisticsParser";
import axios from "axios";
import * as _ from "lodash";
import * as moment from "moment";

type CodeforcesApiResponse = {
  status: string;
  result: Array<{
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: {
      contestId: number;
      index: string;
      name: string;
      type: string;
      points: number;
      rating: number;
      tags: Array<string>;
    };
    verdict: string;
    testset: string;
  }>;
};

export class CodeforcesParser extends StatisticsParser {
  async fetch() {
    const { data } = await axios.get<CodeforcesApiResponse>(
      `https://codeforces.com/api/user.status?handle=${this.handle}&from=1&count=10000`
    );

    const acceptedSubmissions = data.result.filter(
      (s) => s.verdict === "OK" && s.testset === "TESTS"
    );

    return {
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
  }
}
