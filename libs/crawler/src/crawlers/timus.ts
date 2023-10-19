import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

const INVALID_PROBLEM_URL_ERROR = "Invalid Timus problem URL";

type TimusUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class TimusCrawler implements Crawler<TimusUrlParams> {
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp(
        "https\\://acm.timus.ru/problem.aspx\\?space=1&num=:problemId"
      )
    }
  ] as const;

  formatUrl(url: string) {
    const _url = new URL(url);
    const space = _url.searchParams.get("space");
    const num = _url.searchParams.get("num");
    if (space && num) {
      const _newUrl = new URL("https://acm.timus.ru/problem.aspx");
      _newUrl.searchParams.append("space", "1");
      _newUrl.searchParams.append("num", num);
      return _newUrl.toString();
    }
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  getUrlParams(url: string): TimusUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of TimusCrawler.urlPatterns) {
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

  async fetchProblem(url: string) {
    url = unifyUrl(url);

    url = this.formatUrl(url);
    const { problemId } = this.getUrlParams(url);

    const { data } = await axios.get(url);
    const _ = cheerio.load(data);

    const name = _("h2.problem_title").text().trim().split(". ")[1];

    if (!name) {
      throw new Error(INVALID_PROBLEM_URL_ERROR);
    }

    return {
      pid: `Tim-${problemId}`,
      name,
      difficulty: 0,
      url,
      tags: []
    };
  }
}
