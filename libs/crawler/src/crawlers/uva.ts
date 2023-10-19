import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

export type UvaUrlParams = {
  type: "problemset_url";
  problemId: string;
};

const UNREACHABLE_SERVER_ERROR = "UVA server unreachable";
const INVALID_PROBLEM_URL_ERROR = "Invalid UVA problem URL";

export class UvaCrawler implements Crawler<UvaUrlParams> {
  // define valid URL patterns of a UVa problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp(
        "https\\://onlinejudge.org/index.php\\?option=com_onlinejudge&Itemid=8&page=show_problem&problem=:problemId"
      )
    }
  ];

  formatUrl(url: string) {
    const _url = new URL(url);
    const option = _url.searchParams.get("option");
    const itemId = _url.searchParams.get("Itemid");
    const page = _url.searchParams.get("page");
    const problemId = _url.searchParams.get("problem");
    // if all params exist, reorder the params in a consistent way
    if (option && itemId && page && problemId) {
      const res = new URL("https://onlinejudge.org/index.php");
      res.searchParams.append("option", "com_onlinejudge");
      res.searchParams.append("Itemid", "8");
      res.searchParams.append("page", "show_problem");
      res.searchParams.append("problem", problemId);
      return res.toString();
    }
    throw new Error(INVALID_PROBLEM_URL_ERROR);
  }

  getUrlParams(url: string): UvaUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of UvaCrawler.urlPatterns) {
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

    // ensuring consistent ordering of URL params
    url = this.formatUrl(url);
    const result = this.getUrlParams(url);

    const { data } = await axios.get(
      `https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=${result.problemId}`
    );

    const _ = cheerio.load(data);

    const err = _(".err").text().trim();
    if (err.length) {
      throw new Error(UNREACHABLE_SERVER_ERROR);
    }

    const str = _(".floatbox tr td h3").text().trim();
    if (!str.length) throw new Error(INVALID_PROBLEM_URL_ERROR);

    const parts = str.split(" - ");
    const pid = "UVA-" + parts[0];
    const name = parts.slice(1).join(" - ").trim();

    return {
      pid,
      name,
      tags: [],
      difficulty: 0,
      url // url is already consistent
    };
  }
}
