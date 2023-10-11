import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid Codeforces problem URL";

export type SpojUrlParams = {
  problemId: string;
};

export class SpojParser implements OJParser<SpojUrlParams> {
  // define valid URL patterns of a CodeChef problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://spoj.com/problems/:problemId")
    }
  ] as const;

  getUrlParams(url: string): SpojUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of SpojParser.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      return {
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
      `https://www.spoj.com/problems/${result.problemId}`
    );
    const _ = cheerio.load(data);
    // extract problem id and name
    const [problemId, name] = _(".prob #problem-name")
      .text()
      .trim()
      .split(" - ");

    return {
      pid: `SPOJ-${problemId}`,
      name,
      tags: [],
      difficulty: 0,
      url: `https://www.spoj.com/problems/${result.problemId}`
    };
  }
}
