import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import * as cheerio from "cheerio"
import * as path from "path"
import * as url from "url"
import ShortUniqueId from "short-unique-id"

const UrlPattern = require("url-pattern")
const genId = new ShortUniqueId({ length: 6 })

@Injectable()
export class ParsersService {
  constructor(private httpService: HttpService) {}

  isValidLink(link) {
    let url
    try {
      url = new URL(link)
    } catch (_) {
      return false
    }
    return url.protocol === "http:" || url.protocol === "https:"
  }

  async parseProblem(link) {
    const parserMap = {
      "codeforces.com": this.cfParser,
      "lightoj.com": this.lightOjParser,
      "onlinejudge.org": this.uvaOjParser,
      "cses.fi": this.csesParser,
      "toph.co": this.tophParser,
      "spoj.com": this.spojParser,
      "www.spoj.com": this.spojParser,
      "atcoder.jp": this.atCoderParser,
      "www.atcoder.jp": this.atCoderParser,
    }

    try {
      let hostname = new URL(link).hostname
      /**
       * If we have a dedicated parser for the OJ
       */
      if (parserMap[hostname]) {
        const parsedResult = await parserMap[hostname].call(this, link)
        return parsedResult
      } else {
        /**
         * We don't have a parser for the link
         */
        return {
          pid: genId(),
          name: this.isValidLink(link) ? genId() : link,
          tags: [],
          difficulty: 0,
          judge_id: null,
        }
      }
    } catch (err) {
      throw err
    }
  }

  /**
   **  Parser for codeforces.com
   */
  async cfParser(link) {
    /**
     * Check if the problem is link is valid
     */
    const cfValidPatterns = [
      new UrlPattern("/contest/:contestId/problem/:problemId"),
      new UrlPattern("/problemset/problem/:contestId/:problemId"),
      new UrlPattern("/gym/:contestId/problem/:problemId"),
    ]

    let matchedResult: any
    let isInvalid: boolean = true
    cfValidPatterns.forEach((pattern) => {
      let result = pattern.match(new URL(link).pathname)
      if (result) {
        matchedResult = result
        isInvalid = false
      }
    })

    if (isInvalid) {
      throw new Error("Invalid codeforces link!")
    }

    /**
     * Get the source of the provided codeforces link
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    /**
     * Valid pattern but wrong URL, example problem `Z` would less likely to exist in Codeforces rounds
     * In that case, https://codeforces.com/contest/1616/problem/Z is a valid matching pattern but the problem doesn't exist
     */
    isInvalid = $(".title a").html() !== null
    if (isInvalid) {
      throw new Error("Invalid codeforces link!")
    }

    /**
     * Extract informations from source
     */
    const pid = `CF-${matchedResult.contestId}${matchedResult.problemId}`
    const name = $(".title").html().split(". ")[1]

    /**
     * Iterate over all tags of the problem
     */
    const tags = []
    let difficulty = 0
    $(".roundbox .tag-box").each(function (i, e) {
      const tag = $(this).text().trim()
      /**
       * Extract the tag with starts with * - use it as tje problem difficulty
       */
      if (tag.includes("*") && tag.indexOf("*") === 0)
        difficulty = parseInt(tag.substring(1))
      else tags.push(tag)
    })

    /**
     * Set judge_id for codeforces
     */
    const judge_id = 1
    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }

  /**
   *  Parser for lightoj.com
   */
  async lightOjParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)
    // extract informations
    const pid = $(".tags .is-link").text().trim()
    const name = $(".title").text().trim()
    const difficulty = 0
    const tags = []
    const judge_id = 6
    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }

  /**
   *  Parser for onlineJudge.com(UVA)
   */
  async uvaOjParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const str = $(".floatbox tr td h3").text().trim()
    const parts = str.split(" - ")

    const pid = "UVA-" + parts[0]
    const name = parts.slice(1).join(" ").trim()
    const difficulty = 0
    const tags = []
    const judge_id = 7

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }

  /**
   *  Parser for cses.fi(CSES)
   */
  async csesParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const name = $(".title-block h1").text().trim()

    // problem id
    const { name: pathName } = path.parse(link)
    const splitName = pathName.includes("lang")
      ? pathName.split("?")[0]
      : pathName

    const pid = "CSES-" + splitName

    // problem difficulty
    const difficulty = 0

    // problem tags
    const tags = []

    // attached judge_id
    const judge_id = 8

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }

  /**
   *  Parser for toph.co
   */
  async tophParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    // problem name
    const pname = $(".artifact__caption h1").text().trim()
    const name = pname

    /// problem id
    const { name: pathName } = path.parse(link)
    const splitName = pathName.includes("lang")
      ? pathName.split("?")[0]
      : pathName

    const pid = "TH-" + splitName

    // problem difficulty
    const difficulty = 0

    // problem tags
    const tags = []
    $(".flair__item .text a").each(function () {
      const tag = $(this).text().trim()
      tags.push(tag)
    })
    const judge_id = 9

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }

  /**
   *  Parser for spoj.com
   */
  async spojParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const str = $(".prob #problem-name").text().trim()
    const parts = str.split(" - ")
    const name = parts[1]
    const pid = "SPOJ-" + parts[0]

    const difficulty = 0
    const tags = []
    const judge_id = 2

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }
  /**
   *  Parser for spoj.com
   */
  async atCoderParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    // problem name
    const parse = $("#main-container .row span.h2").text().trim()
    const name = parse.split("\n")[0].split("-")[1]

    // problem Id
    const parseLink = url.parse(link, true)
    const splitName = parseLink.pathname.split("/")[4]
    const pid = "AC-" + splitName

    // problem difficulty
    const difficulty = 0

    // problem tags
    const tags = []
    const judge_id = 4

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
    }
  }
}
