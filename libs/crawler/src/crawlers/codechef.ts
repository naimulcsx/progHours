import axios from "axios";
import { pathToRegexp } from "path-to-regexp";

import { Crawler, ExtendedCrawler } from "../base/Crawler";
import { Verdict } from "../interfaces";
import { unifyUrl } from "../utils";

const INVALID_PROBLEM_URL_ERROR = "Invalid CodeChef problem URL";

export type CcUrlParams =
  | {
      type: "problem_url" | "submit_url";
      problemId: string;
    }
  | {
      type: "contest_url";
      contestId: string;
      problemId: string;
    };

export type CcSubmissions = {
  totalSolved: number;
  submissions: Array<{
    id: number;
    pid: string;
    url: string;
    contestId: string;
    createdAt: Date;
    verdict: string;
    solvedDuringContest: boolean;
  }>;
};

export class CodeChefCrawler
  implements Crawler<CcUrlParams>, ExtendedCrawler<CcSubmissions>
{
  API_CLIENT_ID: string;
  API_SECRET: string;

  static API_ENDPOINT = "https://api.codechef.com";
  static urlPatterns = [
    {
      type: "submit_url",
      regexp: pathToRegexp("https\\://codechef.com/submit/:problemId")
    },
    {
      type: "problem_url",
      regexp: pathToRegexp("https\\://codechef.com/problems/:problemId")
    },
    {
      type: "contest_url",
      regexp: pathToRegexp(
        "https\\://codechef.com/:contestId/problems/:problemId"
      )
    }
  ] as const;

  private async getToken() {
    const { data: response } = await axios.post<{
      result: { data: { access_token: string; expires_in: string } };
    }>(CodeChefCrawler.API_ENDPOINT + "/oauth/token", {
      grant_type: "client_credentials",
      scope: "public",
      client_id: this.API_CLIENT_ID,
      client_secret: this.API_SECRET,
      redirect_uri: "https://www.google.com"
    });
    return response.result.data.access_token;
  }

  setApiKey({ clientId, secret }: { clientId: string; secret: string }) {
    console.log(clientId, secret);
    this.API_CLIENT_ID = clientId;
    this.API_SECRET = secret;
  }

  getUrlParams(url: string): CcUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of CodeChefCrawler.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      if (pattern.type === "contest_url") {
        return {
          type: "contest_url",
          contestId: match[1],
          problemId: match[2]
        };
      }
      return {
        type: pattern.type,
        problemId: match[1]
      };
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  getVerdict(verdict: string, score: number): Verdict {
    let _verdict: Verdict = "AC";
    switch (verdict) {
      case "AC":
        if (score > 0 && score < 100) _verdict = "PS";
        break;
      case "WA":
        _verdict = "WA";
        break;
      case "TLE":
        _verdict = "TLE";
        break;
      case "CTE":
        _verdict = "CE";
        break;
      case "RTE":
        _verdict = "RE";
        break;
      default:
        _verdict = "OTH";
    }
    return _verdict;
  }

  async fetchProblem(url: string) {
    url = unifyUrl(url);

    const result = this.getUrlParams(url);
    try {
      const { data } = await axios.get(
        `https://www.codechef.com/api/contests/PRACTICE/problems/${result.problemId}`
      );
      return {
        pid: `CC-${data.problem_code}`.trim(),
        name: data.problem_name.trim(),
        difficulty:
          parseInt(data.difficulty_rating) < 0
            ? 0
            : parseInt(data.difficulty_rating),
        tags: data.user_tags.map((e: string) => e.toLowerCase()),
        url: `https://www.codechef.com/problems/${data.problem_code}`
      };
    } catch {
      /**
       * ? This error is thrown by axios
       */
      throw new Error(INVALID_PROBLEM_URL_ERROR);
    }
  }

  async fetchUserSubmissions(handle: string, contestId?: string) {
    type CodechefSubmission = {
      id: number;
      date: string;
      language: string;
      username: string;
      problemCode: string;
      contestCode: string;
      result: string;
      score: string;
      time: number;
      memory: number;
    };

    const submissions: CcSubmissions["submissions"] = [];

    // running this loop thousand times
    // considering upper limit of user submissions as 20k

    let after = 0;
    const PER_PAGE_LIMIT = 20;
    const token = await this.getToken();

    for (let i = 0; i < 1000; ++i) {
      const apiUrl = new URL(`${CodeChefCrawler.API_ENDPOINT}/submissions`);

      apiUrl.searchParams.append("username", handle);
      apiUrl.searchParams.append("limit", PER_PAGE_LIMIT.toString());
      if (contestId) apiUrl.searchParams.append("contestCode", contestId);

      if (after) {
        apiUrl.searchParams.append("after", after.toString());
      }

      const { data } = await axios.get<{
        result: {
          data: {
            content: Array<CodechefSubmission>;
          };
        };
      }>(apiUrl.toString(), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // transform and push into the submissions array
      data.result.data.content.forEach(
        ({ id, problemCode, contestCode, date, result, score }) => {
          const _score = parseInt(score);
          const verdict: Verdict = this.getVerdict(result, _score);

          const submission = {
            id,
            pid: "CC-" + problemCode,
            url: `https://www.codechef.com/problems/${problemCode}`,
            contestId: contestCode,
            createdAt: new Date(date),
            solvedDuringContest: verdict === "AC" && score === "100",
            verdict
          };
          submissions.push(submission);
          after = submission.id;
        }
      );

      // break if this is the last page
      if (data.result.data.content.length < PER_PAGE_LIMIT) break;
    }

    const result: CcSubmissions = {
      totalSolved: 0,
      submissions
    };

    return result;
  }
}
