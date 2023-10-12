import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid CSES problem URL";

export type CsesUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class CsesParser implements OJParser<CsesUrlParams> {
  // define valid URL patterns of a CSES problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://cses.fi/problemset/task/:problemId")
    }
  ] as const;

  getUrlParams(url: string): CsesUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of CsesParser.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      return {
        type: "problemset_url",
        problemId: match[1]
      };
    }

    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  async parse(url: string) {
    const result = this.getUrlParams(url);
    const { data } = await axios.get(
      `https://cses.fi/problemset/task/${result.problemId}`
    );
    const _ = cheerio.load(data);
    const name = _(".title-block h1").text().trim();
    if (!name) {
      // valid pattern but problem doesn't exist
      throw new Error(INVALID_PROBLEM_URL_ERROR);
    }
    return {
      pid: `CSES-${result.problemId}`,
      name,
      tags: [],
      difficulty: 0,
      url: `https://cses.fi/problemset/task/${result.problemId}`
    };
  }
}
