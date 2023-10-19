import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

const INVALID_PROBLEM_URL_ERROR = "Invalid CodeToWin problem URL";

export type CodeToWinUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class CodeToWinCrawler implements Crawler<CodeToWinUrlParams> {
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://codeto.win/problem/:problemId")
    }
  ] as const;

  getUrlParams(url: string): CodeToWinUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of CodeToWinCrawler.urlPatterns) {
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

  async fetchProblem(url: string) {
    url = unifyUrl(url);

    const { problemId } = this.getUrlParams(url);

    const { data } = await axios.get(url);

    const _ = cheerio.load(data);

    const name = _(".problem > .row > h4.railway-font").text().trim();

    return {
      name,
      pid: `CW-${problemId}`,
      difficulty: 0,
      url,
      tags: []
    };
  }
}
