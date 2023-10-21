import axios from "axios";
import * as cheerio from "cheerio";
import { pathToRegexp } from "path-to-regexp";

import { Crawler } from "../base/Crawler";
import { unifyUrl } from "../utils";

const INVALID_PROBLEM_URL_ERROR = "Invalid Toph problem URL";

export type TophUrlParams = {
  type: "problemset_url";
  problemId: string;
};

export class TophCrawler implements Crawler<TophUrlParams> {
  // define valid URL patterns of a Toph problem
  static urlPatterns = [
    {
      type: "problemset_url",
      regexp: pathToRegexp("https\\://toph.co/p/:problemId")
    }
  ];
  getUrlParams(url: string): TophUrlParams {
    url = unifyUrl(url);

    // check if the given url falls into a valid URL pattern
    for (const pattern of TophCrawler.urlPatterns) {
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

    const result = this.getUrlParams(url);
    const { data } = await axios.get(`https://toph.co/p/${result.problemId}`);
    const $ = cheerio.load(data);

    const name = $(".artifact__caption h1").text().trim();
    if (!name) throw new Error("Problem doesn't exist!");

    const tags: string[] = [];
    function convertTagNames(tag: string) {
      let result = "";
      for (const ch of tag) {
        if (ch === ch.toUpperCase()) result += " ";
        result += ch.toLowerCase();
      }
      return result.trim();
    }

    $(".flair__item .text a").each(function () {
      let tag = $(this).text().trim();
      tag = convertTagNames(tag);
      // make sure if the tag is not the problem setters handle
      if (!$(this).hasClass("handle")) tags.push(tag);
    });

    return {
      pid: `Toph-${result.problemId}`,
      name,
      tags,
      difficulty: 0,
      url: `https://toph.co/p/${result.problemId}`
    };
  }
}
