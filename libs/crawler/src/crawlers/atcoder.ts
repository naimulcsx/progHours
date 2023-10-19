import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

const INVALID_PROBLEM_URL_ERROR = "Invalid AtCoder problem URL";

export type AtCoderUrlParams = {
  type: "problemset_url";
  contestId: string;
  problemId: string;
};

export class AtCoderCrawler implements Crawler<AtCoderUrlParams> {
  // define valid URL patterns of a CodeChef problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp(
        "https\\://atcoder.jp/contests/:contestId/tasks/:problemId"
      )
    }
  ] as const;

  getUrlParams(url: string): AtCoderUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of AtCoderCrawler.urlPatterns) {
      const match = pattern.regexp.exec(url);
      if (!match) continue;
      return {
        type: pattern.type,
        contestId: match[1],
        problemId: match[2]
      };
    }
    // when it doesn't match any of the given pattern
    // the link is invalid, hence throwing an error
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  async fetchProblem(url: string) {
    url = unifyUrl(url);

    const { contestId, problemId } = this.getUrlParams(url);

    const { data } = await axios.get(url);
    const _ = cheerio.load(data);

    const name = _("#main-container .row span.h2")
      .text()
      .trim()
      .split("\n")[0]
      .slice(4);

    return {
      name,
      pid: `AC-${problemId}`,
      tags: [],
      difficulty: 0,
      url: `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`
    };
  }
}
