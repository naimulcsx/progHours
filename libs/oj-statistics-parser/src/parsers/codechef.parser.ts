import { Verdict } from "@prisma/client";
import axios from "axios";

import { StatisticsParser } from "../interfaces/StatisticsParser";

export type CodeChefParseResult = {
  judge: "CODECHEF";
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

export class CodeChefParser extends StatisticsParser<CodeChefParseResult> {
  private TOKEN: string;
  private API_CLIENT_ID: string;
  private API_SECRET: string;
  static API_ENDPOINT = "https://api.codechef.com";

  setApiKey({ clientId, secret }: { clientId: string; secret: string }) {
    this.API_CLIENT_ID = clientId;
    this.API_SECRET = secret;
  }

  async getToken() {
    const { data: response } = await axios.post<{
      result: { data: { access_token: string; expires_in: string } };
    }>(CodeChefParser.API_ENDPOINT + "/oauth/token", {
      grant_type: "client_credentials",
      scope: "public",
      client_id: this.API_CLIENT_ID,
      client_secret: this.API_SECRET,
      redirect_uri: "https://www.google.com"
    });
    return response.result.data.access_token;
  }

  async setToken(token: string) {
    this.TOKEN = token;
  }

  async parse() {
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

    const submissions: CodeChefParseResult["submissions"] = [];

    // running this loop thousand times
    // considering upper limit of user submissions as 20k

    let after: number;
    const PER_PAGE_LIMIT = 20;

    for (let i = 0; i < 1000; ++i) {
      const apiUrl = new URL(`${CodeChefParser.API_ENDPOINT}/submissions`);

      apiUrl.searchParams.append("username", this.handle);
      apiUrl.searchParams.append("limit", PER_PAGE_LIMIT.toString());
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
          Authorization: `Bearer ${this.TOKEN}`
        }
      });

      // transform and push into the submissions array
      data.result.data.content.forEach(
        ({ id, problemCode, contestCode, date, result, score }) => {
          const _score = parseInt(score);
          let verdict: Verdict = "AC";

          switch (result) {
            case "AC":
              if (_score > 0 && _score < 100) verdict = "PS";
              break;
            case "WA":
              verdict = "WA";
              break;
            case "TLE":
              verdict = "TLE";
              break;
            case "CTE":
              verdict = "CE";
              break;
            case "RTE":
              verdict = "RE";
              break;
            default:
              verdict = "OTH";
          }

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

    const result: CodeChefParseResult = {
      judge: "CODECHEF",
      totalSolved: 0,
      submissions
    };

    return result;
  }
}
