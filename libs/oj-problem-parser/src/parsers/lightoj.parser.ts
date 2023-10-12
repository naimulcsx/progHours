import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { OJParser } from "../core/OJParser";

const INVALID_PROBLEM_URL_ERROR = "Invalid AtCoder problem URL";

export type LightOjUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class LightOjParser implements OJParser<LightOjUrlParams> {
  // define valid URL patterns of a LightOJ problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://lightoj.com/problem/:problemId")
    }
  ] as const;

  getUrlParams(url: string): LightOjUrlParams {
    // check if the given url falls into a valid URL pattern
    for (const pattern of LightOjParser.urlPatterns) {
      const match = pattern.regexp.exec(url);
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

  async parse(url: string) {
    const { problemId } = this.getUrlParams(url);

    const response = await axios.get(
      `https://lightoj.com/problem/${problemId}`
    );

    /**
     * Getting the original URL
     * `https://lightoj.com/problem/1026` redirects to `https://lightoj.com/problem/critical-links`
     * So always storing `https://lightoj.com/problem/critical-links` into database
     */
    const originalUrl =
      response?.request?.socket?._httpMessage?.res?.responseUrl;

    const _ = cheerio.load(response.data);
    const pid = _(".tags .is-link").text().trim();
    const name = _(".title").text().trim();

    return {
      pid,
      name,
      difficulty: 0,
      tags: [],
      url: originalUrl
    };
  }
}
