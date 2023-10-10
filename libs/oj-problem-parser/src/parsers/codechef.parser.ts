import axios from "axios";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid CodeChef problem URL";

export type CcUrlParams = {
  type: "problem_url" | "submit_url";
  problemId: string;
};

export class CodechefParser extends OJParser<CcUrlParams> {
  // define valid URL patterns of a CodeChef problem
  static urlPatterns = [
    {
      type: "submit_url",
      regexp: pathToRegexp("https\\://codechef.com/submit/:problemId")
    },
    {
      type: "problem_url",
      regexp: pathToRegexp("https\\://codechef.com/problems/:problemId")
    }
  ] as const;

  getUrlParams(): CcUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of CodechefParser.urlPatterns) {
      const match = pattern.regexp.exec(this.url);
      if (!match) continue;
      return {
        type: pattern.type,
        problemId: match[1]
      };
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
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
      throw new Error(INVALID_PROBLEM_URL_ERROR);
    }
  }
}
