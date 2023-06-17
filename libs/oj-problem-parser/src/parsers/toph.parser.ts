import { OJParser } from "../core/OJParser";
import { pathToRegexp } from "path-to-regexp";
import axios from "axios";
import * as cheerio from "cheerio";
import { isUppercase } from "class-validator";

export type TophUrlParams = {
  problemId: string;
};

export class TophParser extends OJParser<TophUrlParams> {
  getUrlParams(): TophUrlParams {
    const pattern = pathToRegexp("https\\://toph.co/p/:problemId");
    const match = pattern.exec(this.url);
    console.log({ pattern, match, url: this.url });

    if (!match) {
      throw new Error("Invalid Toph link");
    }
    console.log(match);
    return {
      problemId: match[1]
    };
  }

  async parse() {
    const result = this.getUrlParams();
    const { data } = await axios.get(`https://toph.co/p/${result.problemId}`);
    const $ = cheerio.load(data);

    /**
     * Problem name
     */
    const name = $(".artifact__caption h1").text().trim();
    if (!name) throw new Error("Problem doesn't exist!");

    /**
     * problem tags
     */
    const tags = [];
    function convertTagNames(tag: string) {
      let result = "";
      for (const ch of tag) {
        if (isUppercase(ch)) result += " ";
        result += ch.toLowerCase();
      }
      return result.substring(1);
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
