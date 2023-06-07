import { pathToRegexp } from "path-to-regexp";
import { OJParser } from "../core/OJParser";
import axios from "axios";

export type CcUrlParams =
  | {
      problemId: string;
    }
  | {
      contestId: string;
      problemId: string;
    };

export class CodechefParser extends OJParser<CcUrlParams> {
  getUrlParams(): CcUrlParams {
    const patterns = [
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
    ];
    for (const pattern of patterns) {
      const match = pattern.regexp.exec(this.url);
      if (!match) continue;

      if (pattern.type === "contest_url") {
        return {
          contestId: match[1],
          problemId: match[2]
        };
      } else {
        return {
          problemId: match[1]
        };
      }
    }
    throw new Error("Invalid Codechef URL");
  }

  async parse() {
    const result = this.getUrlParams();

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
      throw new Error("Invalid Codechef problem!");
    }
  }
}
