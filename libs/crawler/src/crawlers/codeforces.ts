import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler, ExtendedCrawler } from "../base/Crawler";
import { Verdict } from "../interfaces";
import { unifyUrl } from "../utils";

import moment = require("moment");

const UNREACHABLE_API_ERROR = "Codeforces API unreachable";
const INVALID_PROBLEM_URL_ERROR = "Invalid Codeforces problem URL";

export type CfUrlParams =
  | {
      type: "contest_url" | "problemset_url" | "gym_url";
      contestId: string;
      problemId: string;
    }
  | {
      type: "group_url";
      groupId: string;
      contestId: string;
      problemId: string;
    };

export type CfSubmissions = {
  totalSolved: number;
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

export class CodeforcesCrawler
  implements Crawler<CfUrlParams>, ExtendedCrawler<CfSubmissions>
{
  // define valid URL patterns of a Codeforces problem
  static urlPatterns = [
    {
      type: "contest_url",
      regexp: pathToRegexp(
        "https\\://codeforces.com/contest/:contestId/problem/:problemId"
      )
    },
    {
      type: "problemset_url",
      regexp: pathToRegexp(
        "https\\://codeforces.com/problemset/problem/:contestId/:problemId"
      )
    },
    {
      type: "gym_url",
      regexp: pathToRegexp(
        "https\\://codeforces.com/gym/:contestId/problem/:problemId"
      )
    },
    {
      type: "group_url",
      regexp: pathToRegexp(
        "https\\://codeforces.com/group/:groupId/contest/:contestId/problem/:problemId"
      )
    }
  ] as const;

  private getPid(result: CfUrlParams) {
    const { contestId, problemId } = result;
    if (result.type === "gym_url") {
      return `Gym-${contestId}${problemId}`;
    }
    return `CF-${contestId}${problemId}`;
  }

  getUrlParams(url: string): CfUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of CodeforcesCrawler.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      if (
        pattern.type === "contest_url" ||
        pattern.type === "problemset_url" ||
        pattern.type === "gym_url"
      ) {
        return {
          type: pattern.type,
          contestId: match[1],
          problemId: match[2]
        };
      } else if (pattern.type === "group_url") {
        return {
          type: pattern.type,
          groupId: match[1],
          contestId: match[2],
          problemId: match[3]
        };
      }
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  async fetchProblem(url: string) {
    url = unifyUrl(url);

    const result = this.getUrlParams(url);

    if (result.type === "group_url") {
      const { data } = await axios.get(url);
      const _ = cheerio.load(data);

      const pid = this.getPid(result);
      const name = _("div.header > div.title")
        .text()
        .trim()
        .split(". ")
        .slice(1)
        .join("")
        .trim();
      const tags: string[] = [];
      let difficulty = 0;

      // the url matches the pattern, but the problem page does not exist
      if (name.length === 0) {
        throw new Error(INVALID_PROBLEM_URL_ERROR);
      }

      // group problems don't have tags, the iteration below will never likely to run
      _(".tag-box").each(function () {
        const tag = _(this).text().trim();
        if (tag.indexOf("*") === 0) {
          difficulty = Number(tag.slice(1)) || 0;
        } else {
          tags.push(tag);
        }
      });

      return {
        pid,
        name,
        difficulty,
        tags,
        url
      };
    } else {
      type CfApiResponse = {
        result: {
          problems: Array<{
            name: string;
            index: string;
            tags: string[];
            points?: number;
            rating?: number;
          }>;
        };
      };

      try {
        const { data } = await axios.get<CfApiResponse>(
          `https://codeforces.com/api/contest.standings?contestId=${result.contestId}&from=1&count=1`
        );
        // the API sends down HTML when API server is in maintainance or down
        if (typeof data === "string") {
          throw new Error(UNREACHABLE_API_ERROR);
        }
        const problem = data.result.problems.find(
          (p) => p.index === result.problemId
        );
        if (!problem) {
          throw new Error(INVALID_PROBLEM_URL_ERROR);
        }
        return {
          pid: this.getPid(result),
          name: problem.name,
          difficulty: problem.rating ?? 0,
          tags: problem.tags,
          url: `https://codeforces.com/contest/${result.contestId}/problem/${result.problemId}`
        };
      } catch (err) {
        /**
         * Case 1: Valid pattern but wrong problemId, for example problem `Z` would less likely
         * to exist in Codeforces rounds. e.g https://codeforces.com/contest/1616/problem/Z
         * is a valid matching pattern but the problem doesn't exist.
         * ? The error is thrown by us
         *
         * Case 2: Valid pattern but wrong contestId, e.g https://codeforces.com/contest/16161/problem/Z
         * is a valid matching pattern but the contest doesn't exist.
         * ? This error is thrown by axios (400 Bad Request from API)
         *
         *
         * Case 3: Other axios errors
         * ? This error is thrown by axios
         */
        throw new Error(INVALID_PROBLEM_URL_ERROR);
      }
    }
  }

  getVerdict(verdict: string) {
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
    return _verdict;
  }

  async fetchUserSubmissions(handle: string, contestId?: string) {
    if (contestId) {
      return this.getUserContestSubmissions(handle, contestId);
    }

    const { data } = await axios.get<{
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
          points?: number;
          rating?: number;
          tags: Array<string>;
        };
        verdict: Verdict;
        testset: string;
      }>;
    }>(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`
    );
    const submissions = data.result.map(
      ({ id, problem, creationTimeSeconds, contestId, verdict }) => {
        const _verdict: Verdict = this.getVerdict(verdict);
        return {
          id,
          contestId,
          pid: `CF-${contestId}${problem.index}`,
          name: problem.name,
          url: `https://codeforces.com/contest/${contestId}/problem/${problem.index}`,
          createdAt: moment.unix(creationTimeSeconds).toDate(),
          difficulty: problem.rating || 0,
          tags: problem.tags,
          verdict: _verdict
        };
      }
    );

    const acceptedSubmissions = submissions.filter((s) => s.verdict === "AC");

    const result: CfSubmissions = {
      totalSolved: acceptedSubmissions.length,
      submissions
    };

    return result;
  }

  private async getUserContestSubmissions(handle: string, contestId: string) {
    const { data } = await axios.get<{
      result: Array<{
        id: number;
        creationTimeSeconds: number;
        contestId: number;
        problem: {
          name: string;
          index: string;
          points?: number;
          rating?: number;
          tags: string[];
        };
        author: { participantType: string };
        verdict: Verdict;
      }>;
    }>(
      `https://codeforces.com/api/contest.status?contestId=${contestId}&handle=${handle}`
    );
    const submissions = data.result.map(
      ({ id, problem, creationTimeSeconds, contestId, verdict }) => {
        const _verdict: Verdict = this.getVerdict(verdict);
        return {
          id,
          contestId,
          pid: `CF-${contestId}${problem.index}`,
          name: problem.name,
          url: `https://codeforces.com/contest/${contestId}/problem/${problem.index}`,
          createdAt: moment.unix(creationTimeSeconds).toDate(),
          difficulty: problem.rating || 0,
          tags: problem.tags,
          verdict: _verdict
        };
      }
    );

    const acceptedSubmissions = submissions.filter((s) => s.verdict === "AC");

    const result: CfSubmissions = {
      totalSolved: acceptedSubmissions.length,
      submissions
    };

    return result;
  }
}
