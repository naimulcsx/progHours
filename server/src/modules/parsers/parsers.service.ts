import { HttpService } from "@nestjs/axios"
import {
  BadRequestException,
  CACHE_MANAGER,
  ConsoleLogger,
  Inject,
  Injectable,
} from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import * as cheerio from "cheerio"
import ShortUniqueId from "short-unique-id"
import convertLinkToOriginal from "@/utils/converLinkToOriginal"
import { Cache } from "cache-manager"

import {
  spojLinkTransformer,
  cfLinkTransformer,
  csesLinkTransformer,
  ccLinkTransformer,
  timusLinkTransformer,
  lightOjLinkTransformer,
  atCoderLinkTransformer,
  eolympLinkTransformer,
  beecrowdLinkTransformer,
  uvaLinkTransformer,
  tophLinkTransformer,
  hackrrankLinkTransformer,
  leetcodeLinkTransformer,
  codetowinLinkTransformer,
  hackerearthLinkTransformer,
} from "@/utils/linkTransformers"
import { removeParams, removeTrailingSlash, toHttps } from "@/utils/globalLinkTransformers"
import { isUppercase } from "class-validator"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "../prisma/prisma.service"

const UrlPattern = require("url-pattern")
const genId = new ShortUniqueId({ length: 6 })

interface ParsedResult {
  name: string
  pid: string
  link: string
  tags: string[]
  judge_id: number
  difficulty: number
}

@Injectable()
export class ParsersService {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  /**
   * Checks if a link is valid
   */
  isValidLink(link) {
    let url
    try {
      url = new URL(link)
    } catch (_) {
      return false
    }
    return url.protocol === "http:" || url.protocol === "https:"
  }

  async unifyLink(link: string) {
    const url = new URL(link)
    const { hostname } = url

    /**
     * Apply Global Link Transformers
     */
    link = toHttps(removeParams(removeTrailingSlash(link)))

    /**
     * Link Transformer
     *
     * Changing the Links to the respective OJ link
     * Why?- To remove duplicated entries for the same problem
     * For example
     *    https://codeforces.com/problemset/problem/1617/B
     *    https://vjudge.net/problem/CodeForces-1617B
     */
    const linkConverters = {
      "codeforces.com": cfLinkTransformer, // convert problemset link to contest link
      "www.codeforces.com": cfLinkTransformer, // removes www + convert problemset link to contest link
      "codechef.com": ccLinkTransformer, // adds www + convert contest link to problemset link
      "www.codechef.com": ccLinkTransformer, // convert contest link to problemset link
      "spoj.com": spojLinkTransformer, // adds www
      "www.cses.fi": csesLinkTransformer, // removes www
      "acm.timus.ru": timusLinkTransformer, // convert print.asp link to problem.asp link
      "www.lightoj.com": lightOjLinkTransformer, // removes www
      "www.atcoder.jp": atCoderLinkTransformer, // removes www
      "www.onlinejudge.org": uvaLinkTransformer, // removes www
      "eolymp.com": eolympLinkTransformer, // adds www
      // "beecrowd.com.br": beecrowdLinkTransformer, // adds www + convert repository link
      // "www.beecrowd.com.br": beecrowdLinkTransformer, // convert repository link
      "www.toph.co": tophLinkTransformer, // removes www
      "hackerrank.com": hackrrankLinkTransformer, // adds www
      "www.hackerrank.com": hackrrankLinkTransformer, // adds www + unify links
      "www.leetcode.com": leetcodeLinkTransformer, // removes www
      "www.codeto.win": codetowinLinkTransformer, // removes www
      // "hackerearth.com": hackerearthLinkTransformer, // adds www
    }

    if (hostname === "vjudge.net") {
      // convert vjudge links to respective OJ link
      const convertedLink = await convertLinkToOriginal(link, this.cacheManager)
      if (convertedLink === "VJUDGE_PASSWORD_PROTECTED") {
        throw new Error("Vjudge passowrd protected.")
      } else link = convertedLink
    }

    if (linkConverters[hostname]) link = linkConverters[hostname](link)
    return link
  }

  async createOrParseProblem(link: string) {
    let problemId: number
    try {
      link = await this.unifyLink(link)
    } catch (err) {
      throw new BadRequestException(err)
    }
    let foundProblem = await this.prisma.problem.findUnique({ where: { link } })
    if (foundProblem) problemId = foundProblem.id
    else {
      // If the problem does not exist in the database
      // then we need to parse it by making a network request
      // and then save it in our database
      try {
        // parse the problem with the help of parser service
        const problem = await this.parseProblem(link)

        const { name, pid, tags, difficulty, judge_id } = problem

        // save the problem that we've parsed
        const newProblem = await this.prisma.problem.create({
          data: {
            name,
            pid,
            difficulty,
            link,
            onlineJudgeId: judge_id,
          },
        })

        // * insert the tags, if they do not exist in the database
        /**
         * Some problem in codeforces have the same tag twice
         * And our system constrains same tag multiple times for a problem
         * So it results in an error. In order to fix it, we keep a map of booleans
         * Eg. https://codeforces.com/contest/1593/problem/B
         */
        const tagMap = {}

        for (let tag of tags) {
          // find or create the tag
          const tagObject = await this.prisma.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag },
          })
          if (!tagMap[tagObject.id]) {
            // insert tagId and problemId into the junction table
            await this.prisma.problemTag.create({
              data: {
                problemId: newProblem.id,
                tagId: tagObject.id,
              },
            })
            tagMap[tagObject.id] = true
          }
        }
        // save the problem id
        problemId = newProblem.id
      } catch (err) {
        throw new BadRequestException(err.message)
      }
    }
    return problemId
  }

  /**
   * Entry point for all links, links will get routed here depneding on the online judge
   * If there is no online judge for link, it also gets handled here
   */
  async parseProblem(link: string): Promise<ParsedResult> {
    const parserMap = {
      "codeforces.com": this.cfParser, // 1
      "www.codechef.com": this.ccParser, // 2
      "cses.fi": this.csesParser, // 3
      "onlinejudge.org": this.uvaParser, // 4
      "toph.co": this.tophParser, // 5
      "www.spoj.com": this.spojParser, // 6
      "www.hackerrank.com": this.hackerrankParser, // 7
      "lightoj.com": this.lightOJParser, // 8
      "atcoder.jp": this.atCoderParser, // 9
      "www.eolymp.com": this.eolympParser, // 10
      // "www.beecrowd.com.br": this.beeCrowdParser, // 11
      "leetcode.com": this.leetCodeParser, // 12
      "acm.timus.ru": this.timusParser, // 13
      "codeto.win": this.codeToWinParser, // 14
      // "icpcarchive.ecs.baylor.edu": this.icpcarchiveParser, // 15
      // "www.hackerearth.com": this.hackerEarthParser, // 16
      "open.kattis.com": this.kattisOJParser, // 17
      "vjudge.net": this.vjudgeParser,
    }
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
      throw new BadRequestException("Parser unavailable for this link!")
      // return {
      //   pid: genId(),
      //   name: this.isValidLink(link) ? genId() : link,
      //   tags: [],
      //   difficulty: 0,
      //   judge_id: null,
      //   link: null,
      // }
    }
  }

  /**
   **  Parser for CODEFORCES, id = 1
   */

  async cfParser(link) {
    /**
     * Check if the problem link is valid
     */
    const linkUrl = new URL(link)
    const cfValidPatterns = [
      new UrlPattern("/contest/:contestId/problem/:problemId"),
      new UrlPattern("/gym/:gymId/problem/:problemId"),
      new UrlPattern("/group/:groupId/contest/:contestId/problem/:problemId"),
    ]

    let matchedResult: any
    let isInvalid: boolean = true
    cfValidPatterns.forEach((pattern) => {
      let result = pattern.match(linkUrl.pathname)
      if (result) {
        matchedResult = result
        isInvalid = false
      }
    })

    if (isInvalid || matchedResult.problemId.length > 2) {
      throw new Error("Invalid codeforces link!")
    }

    /**
     * Get the source of the provided codeforces link
     */
    let pid: string,
      name: string,
      tags: string[] = [],
      difficulty: number = 0,
      judge_id = 1

    try {
      const { data } = await lastValueFrom(
        this.httpService.get(
          `https://codeforces.com/api/contest.standings?contestId=${
            matchedResult.contestId || matchedResult.gymId || matchedResult.groupId
          }&from=1&count=1`
        )
      )

      /**
       * Sometimes the API sends down HTML when API server is down
       */
      if (typeof data === "string") {
        throw new Error("Codeforces API down. Please try again later!")
      }

      isInvalid = true
      for (let problem of data.result.problems) {
        if (problem.index === matchedResult.problemId) {
          isInvalid = false
          pid = matchedResult.contestId
            ? `CF-${matchedResult.contestId}${problem.index}`
            : `Gym-${matchedResult.gymId}${problem.index}`
          name = problem.name
          difficulty = problem.rating || 0
          tags = problem.tags
          break
        }
      }

      /**
       * Valid pattern but wrong URL, example problem `Z` would less likely to exist in
       * Codeforces rounds. In that case, https://codeforces.com/contest/1616/problem/Z
       * is a valid matching pattern but the problem doesn't exist
       */
      if (isInvalid) {
        throw new Error("Invalid codeforces link!")
      }
    } catch (err) {
      console.log("Crawling from webpage!!")

      // If the API call fails for some reason, we try to crawl the problem data from the webpage
      const response = await lastValueFrom(this.httpService.get(link))
      const $ = cheerio.load(response.data)

      name = $("div.header > div.title").text().trim().split(". ").slice(1).join("")

      pid = matchedResult.contestId
        ? `CF-${matchedResult.contestId}${matchedResult.problemId}`
        : `Gym-${matchedResult.gymId}${matchedResult.problemId}`
      $(".tag-box").each(function () {
        let tag = $(this).text().trim()
        if (tag.indexOf("*") === 0) difficulty = Number(tag.slice(1)) || 0
        else tags.push(tag)
      })
    }

    return {
      pid,
      name,
      tags,
      difficulty,
      judge_id,
      /**
       * Removing query params before saving the link into database
       */
      link: matchedResult.contestId
        ? matchedResult.groupId
          ? `https://codeforces.com/group/${matchedResult.groupId}/contest/${matchedResult.contestId}/problem/${matchedResult.problemId}`
          : `https://codeforces.com/contest/${matchedResult.contestId}/problem/${matchedResult.problemId}`
        : `https://codeforces.com/gym/${matchedResult.gymId}/problem/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for CODECHEF, id = 2
   */
  async ccParser(link) {
    /**
     * Check if the problem link is valid
     */
    const linkUrl = new URL(link)
    const ccUrlPatterns = [
      new UrlPattern("/submit/:problemId"),
      new UrlPattern("/problems/:problemId"),
      new UrlPattern("/:contestId/problems/:problemId"),
    ]
    let isInvalid = true
    let patternResult: any
    ccUrlPatterns.forEach((pattern) => {
      const result = pattern.match(linkUrl.pathname)
      if (result) {
        patternResult = result
        isInvalid = false
      }
    })

    if (isInvalid) {
      throw new Error("Invalid CodeChef link!")
    }

    /**
     * Get the problem id
     */
    const problemId = patternResult.problemId
    const apiLink = `https://www.codechef.com/api/contests/PRACTICE/problems/${problemId}`
    const response = await lastValueFrom(this.httpService.get(apiLink))

    /**
     * If the problem id is invalid
     */
    if (response.data.status === "error") throw new Error("Invalid CodeChef problem!")

    return {
      pid: `CC-${response.data.problem_code}`.trim(),
      name: response.data.problem_name.trim(),
      tags: response.data.user_tags.map((e) => e.toLowerCase()),
      difficulty:
        Number(response.data.difficulty_rating) < 0 ? 0 : Number(response.data.difficulty_rating),
      judge_id: 2,
      link: `https://www.codechef.com/problems/${response.data.problem_code}`,
    }
  }

  /**
   *  Parser for CSES, id = 3
   */
  async csesParser(link) {
    const linkURL = new URL(link)
    /**
     * Check if the problem link is valid
     * https://cses.fi/problemset/task/:problemId
     */

    const pattern = new UrlPattern("/problemset/task/:problemId")
    let matchedResult = pattern.match(linkURL.pathname)

    if (matchedResult === null) throw new Error("Invalid CSES link!")

    // make network request
    const { data } = await lastValueFrom(this.httpService.get(link))

    // parse name from the webpage
    const $ = cheerio.load(data)
    const name = $(".title-block h1").text().trim()
    if (!name) throw new Error("Problem doesn't exist!")

    const { problemId } = matchedResult

    return {
      pid: `CSES-${problemId}`,
      name,
      tags: [],
      difficulty: 0,
      judge_id: 3,
      link: `https://cses.fi/problemset/task/${problemId}`,
    }
  }

  /**
   *  Parser for UVA, id = 4
   */
  async uvaParser(link) {
    const linkURL = new URL(link)

    /**
     * Check if the problem link is valid
     */
    const uvaPattern = new UrlPattern("/index.php")
    let matchedResult = uvaPattern.match(linkURL.pathname)

    /**
     * Make sure that the link has the required query params
     */
    const problemId = linkURL.searchParams.get("problem")
    const option = linkURL.searchParams.get("option")
    const page = linkURL.searchParams.get("page")
    const itemId = linkURL.searchParams.get("Itemid")

    let isInvalid = !(matchedResult !== null && problemId && option && page && itemId)
    if (isInvalid) throw new Error("Invalid UVA link!")

    /**
     * Extract data from provided link
     */
    const response = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(response.data)

    const err = $(".err").text().trim()
    if (err.length) {
      throw new Error("Server down")
    }
    const str = $(".floatbox tr td h3").text().trim()
    if (!str.length) throw new Error("Invalid problem link!")

    const parts = str.split(" - ")
    const pid = "UVA-" + parts[0]
    const name = parts.slice(1).join(" - ").trim()

    return {
      pid,
      name,
      tags: [],
      difficulty: 0,
      judge_id: 4,
      link: `https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=${problemId}`,
    }
  }

  /**
   *  Parser for TOPH, id = 5
   */
  async tophParser(link) {
    /**
     * Check if the problem link is valid
     */
    const linkUrl = new URL(link)
    const tophURLPattern = new UrlPattern("/p/:problemId")
    let matchedResult = tophURLPattern.match(linkUrl.pathname)

    let isInvalid: boolean = matchedResult === null
    if (isInvalid) throw new Error("Invalid Toph link!")

    /**
     * Get the page source
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    /**
     * Problem name
     */
    const name = $(".artifact__caption h1").text().trim()
    const { problemId } = matchedResult

    /**
     * problem tags
     */
    const tags = []
    function convertTagNames(tag: string) {
      let result = ""
      for (let ch of tag) {
        if (isUppercase(ch)) result += " "
        result += ch.toLowerCase()
      }
      return result.substring(1)
    }

    $(".flair__item .text a").each(function () {
      let tag = $(this).text().trim()
      tag = convertTagNames(tag)

      // make sure if the tag is not the problem setters handle
      if (!$(this).hasClass("handle")) tags.push(tag)
    })

    return {
      pid: `Toph-${problemId}`,
      name,
      tags,
      difficulty: 0,
      judge_id: 5,
      link: `https://toph.co/p/${problemId}`,
    }
  }

  /**
   *  Parser for SPOJ, id = 6
   */
  async spojParser(link) {
    let linkURL = new URL(link)
    /**
     * Check if the problem link is valid
     */
    const pattern = new UrlPattern("/problems/:problemId")
    const result = pattern.match(linkURL.pathname)

    if (!result) throw new Error("Invalid SPOJ link!")

    /**
     * Parse data from link
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)
    const { problemId } = result

    /**
     * Get problem name and link
     */
    const [problemCode, name] = $(".prob #problem-name").text().trim().split(" - ")

    return {
      pid: `SPOJ-${problemCode}`,
      name,
      tags: [],
      difficulty: 0,
      judge_id: 6,
      link: `https://www.spoj.com/problems/${problemId}`,
    }
  }

  /**
   *  Parser for HACKERRANK, id = 7
   */
  async hackerrankParser(link) {
    const linkUrl = new URL(link)

    const hackerrankValidPatterns = [
      new UrlPattern("/challenges/:problemId"),
      new UrlPattern("/contests/:contestId/challenges/:problemId"),
    ]

    let matchedResult: any
    let isInvalid: boolean = true
    hackerrankValidPatterns.forEach((pattern) => {
      let result = pattern.match(linkUrl.pathname)
      if (result) {
        matchedResult = result
        isInvalid = false
      }
    })

    if (isInvalid) {
      throw new Error("Invalid hackerrank link!")
    }

    // Extract data from provided link
    const response = await lastValueFrom(
      this.httpService.get(link, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      })
    )

    const $ = cheerio.load(response.data)

    const { problemId, contestId } = matchedResult
    const pid = `HR-${problemId}`

    /**
     * Problem link
     * hr_tour-challenge-name pull-left mlT
     */
    let pLink, name

    if (contestId) {
      pLink = `https://www.hackerrank.com/contests/${contestId}/challenges/${problemId}`
      name = $('meta[property="og:title"]').attr("content")
    } else {
      pLink = `https://www.hackerrank.com/challenges/${problemId}`
      name = $(".challenge-page-label-wrapper .ui-icon-label.page-label").text().trim()
    }

    return {
      name,
      pid,
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: pLink,
    }
  }

  /**
   *  Parser for LIGHTOJ, id = 8
   */
  async lightOJParser(link) {
    /**
     * Check if the problem link is valid
     */
    const linkUrl = new URL(link)
    const lightOjPattern = new UrlPattern("/problem/:problemName")
    let matchedResult = lightOjPattern.match(linkUrl.pathname)
    let isInvalid: boolean = matchedResult === null
    if (isInvalid) {
      throw new Error("Invalid LightOJ link!")
    }
    /**
     * Get the page source
     */
    try {
      const response = await lastValueFrom(this.httpService.get(link))
      /**
       * Getting the original URL
       * `https://lightoj.com/problem/1026` redirects to `https://lightoj.com/problem/critical-links`
       * So always saving `https://lightoj.com/problem/critical-links` into database
       */
      const originalUrl = response?.request?.socket?._httpMessage?.res?.responseUrl

      const $ = cheerio.load(response.data)
      /**
       * Extract informations
       */
      const pid = $(".tags .is-link").text().trim()
      const name = $(".title").text().trim()
      /**
       * Todo: We can assign difficulty based of the difficulty tag - easy, medium, hard etc.
       */
      const difficulty = 0
      const tags = []
      const judge_id = 8
      return {
        pid,
        name,
        tags,
        difficulty,
        judge_id,
        /**
         * Constructing link again for ignoring query params
         */
        link: originalUrl,
      }
    } catch (err) {
      console.log(err)
      throw new Error("Invalid LightOJ link!")
    }
  }

  /**
   *  Parser for ATCODER, id = 9
   */
  async atCoderParser(link) {
    const linkUrl = new URL(link)

    /**
     * Check if the problem link is valid
     */
    const acUrlPattern = new UrlPattern("/contests/:contestId/tasks/:problemId")
    let matchedResult = acUrlPattern.match(linkUrl.pathname)

    let isInvalid = matchedResult === null
    if (isInvalid) throw new Error("Invalid Atcoder link!")

    /**
     * Parse data from URL
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    /**
     * Parse problem name
     */
    const name = $("#main-container .row span.h2").text().trim().split("\n")[0].slice(4)

    return {
      name,
      pid: `AC-${matchedResult.problemId}`,
      tags: [],
      difficulty: 0,
      judge_id: 9,
      link: `https://atcoder.jp/contests/${matchedResult.contestId}/tasks/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for EOLYMP, id = 10
   */
  async eolympParser(link) {
    const linkUrl = new URL(link)

    /**
     * Check if the problem link is valid
     */
    let isInvalid: boolean = true
    const eolympPattern = new UrlPattern("/en/problems/:problemId")
    let matchedResult = eolympPattern.match(linkUrl.pathname)
    if (matchedResult) {
      isInvalid = false
    }
    if (isInvalid) {
      throw new Error("Invalid eolymp link!")
    }

    // Extract data from provided link
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    // problem name
    const name = $(".eo-paper__header").text().trim()

    return {
      name,
      pid: `Eolymp-${matchedResult.problemId}`,
      tags: [],
      difficulty: 0,
      judge_id: 10,
      link: `https://www.eolymp.com/en/problems/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for BEECROWD, id = 11
   */
  async beeCrowdParser(link) {
    const linkURL = new URL(link)

    /**
     * Check if the problem link is valid
     */
    let isInvalid: boolean = true
    const beecrowdPattern = new UrlPattern("/judge/en/problems/view/:problemId")
    let matchedResult = beecrowdPattern.match(linkURL.pathname)
    if (matchedResult) {
      isInvalid = false
    }

    if (isInvalid) {
      throw new Error("Invalid beecrowd link!")
    }

    /**
     * Make HTTP Request and parse from the source code
     */
    const { data } = await lastValueFrom(
      this.httpService.get(link, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      })
    )
    const $ = cheerio.load(data)
    const name = $("title").text().trim().split(" - ")[1]

    return {
      name,
      pid: `BC-${matchedResult.problemId}`,
      tags: [],
      difficulty: 0,
      judge_id: 11,
      link: `https://www.beecrowd.com.br/judge/en/problems/view/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for LEETCODE, id = 12
   */
  async leetCodeParser(link) {
    const linkUrl = new URL(link)

    const leetPatterns = [new UrlPattern("/problems/:problemId")]

    let matchedResult: any
    let isInvalid: boolean = true
    leetPatterns.forEach((pattern) => {
      let result = pattern.match(linkUrl.pathname)
      if (result) {
        matchedResult = result
        isInvalid = false
      }
    })

    if (isInvalid) throw new Error("Invalid leetcode problem link!")

    // Extract data from provided link
    const { data } = await lastValueFrom(
      this.httpService.post("https://leetcode.com/graphql", {
        operationName: "questionData",
        variables: { titleSlug: matchedResult.problemId },
        query:
          "query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId, title, titleSlug }}",
      })
    )

    const { questionId, title } = data.data.question
    const pid = `LC-${questionId}`

    return {
      name: title,
      pid,
      tags: [],
      difficulty: 0,
      judge_id: 12,
      link: `https://leetcode.com/problems/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for TIMUS, id = 13
   */
  async timusParser(link) {
    const linkUrl = new URL(link)

    /**
     * Check if the problem link is valid
     */
    const timusOJPattern = new UrlPattern("/problem.aspx")
    let matchedResult = timusOJPattern.match(linkUrl.pathname)

    let isInvalid: boolean = matchedResult === null
    if (isInvalid) {
      throw new Error("Invalid Timus OJ link!")
    }

    let problemId
    problemId = linkUrl.searchParams.get("num")
    const spaceId = linkUrl.searchParams.get("space")

    // Extract data from provided link
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const parse = $("h2.problem_title").text().trim()
    const name = parse.split(". ")[1]

    let pid
    if (spaceId !== "1") {
      const parseName = $("table td a > nobr").text().trim()

      problemId = parseName.split(". ")[0]
      pid = `Tim-${problemId}`
    } else pid = `Tim-${problemId}`

    return {
      name,
      pid,
      tags: [],
      difficulty: 0,
      judge_id: 13,
      link: `https://acm.timus.ru/problem.aspx?space=1&num=${problemId}`,
    }
  }

  /**
   *  Parser for CodeToWin, id = 14
   */
  async codeToWinParser(link) {
    const linkUrl = new URL(link)

    /**
     * Check if the problem link is valid
     */
    const codeToWinOJPattern = new UrlPattern("/problem/:problemId")
    let matchedResult = codeToWinOJPattern.match(linkUrl.pathname)

    let isInvalid: boolean = matchedResult === null
    if (isInvalid) {
      throw new Error("Invalid CodeToWin link!")
    }

    // Extract data from provided link
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const name = $(".problem > .row > h4.railway-font").text().trim()
    const pid = "CW-" + matchedResult.problemId

    return {
      name,
      pid,
      tags: [],
      difficulty: 0,
      judge_id: 14,
      link: `https://codeto.win/problem/${matchedResult.problemId}`,
    }
  }

  /**
   *  Parser for UVALive, id = 15
   */
  async icpcarchiveParser(link) {
    const linkURL = new URL(link)

    /**
     * Check if the problem link is valid
     */
    const pattern = new UrlPattern("/index.php")
    let matchedResult = pattern.match(linkURL.pathname)

    /**
     * Make sure that the link has the required query params
     */
    const problemId = linkURL.searchParams.get("problem")
    const option = linkURL.searchParams.get("option")
    const page = linkURL.searchParams.get("page")
    const itemId = linkURL.searchParams.get("Itemid")

    let isInvalid = !(matchedResult !== null && problemId && option && page && itemId)

    if (isInvalid) throw new Error("Invalid ICPC Live Archive link!")

    /**
     * Extract data from provided link
     */
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // for ignoring ssl certificate
    const response = await lastValueFrom(this.httpService.get(link))
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1"

    const $ = cheerio.load(response.data)
    const str = $(".maincontent table tr:nth-child(2) h3").text().trim()
    const parts = str.split(" - ")

    if (parts.length !== 2) {
      throw new Error("Invalid ICPC Live Archive link!")
    }

    const pid = "ICPCLive-" + parts[0]
    const name = parts.slice(1).join(" ").trim()

    return {
      pid,
      name,
      tags: [],
      difficulty: 0,
      judge_id: 15,
      link: `https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=${problemId}`,
    }
  }

  /**
   *  Parser for HackerEarth, id = 16
   */
  async hackerEarthParser(link) {
    const linkUrl = new URL(link)

    const heURLPatterns = [
      new UrlPattern(
        "/practice/:taskName/:category/:subCategory/practice-problems/:problemType/:problemId"
      ),
      new UrlPattern("/problem/:problemType/:problemId"),
    ]

    let matchedResult: any
    let isInvalid: boolean = true
    heURLPatterns.forEach((pattern) => {
      let result = pattern.match(linkUrl.pathname)

      if (result) {
        matchedResult = result
        isInvalid = false
      }
    })

    if (isInvalid) throw new Error("Invalid hackerearth problem link!")

    const { taskName, category, subCategory, problemType, problemId } = matchedResult

    /**
     * Extract data from provided link
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    const name = $("title").text().trim().split(" | ")[0]

    const parseId = matchedResult.problemId.split("-")
    const pid = "HE-" + parseId[parseId.length - 1]

    /**
     * Problem link
     */
    let pLink: string
    if (!subCategory) {
      pLink = `https://www.hackerearth.com/problem/${problemType}/${problemId}`
    } else {
      pLink = `https://www.hackerearth.com/practice/${taskName}/${category}/${subCategory}/practice-problems/${problemType}/${problemId}`
    }

    return {
      name,
      pid,
      tags: [],
      difficulty: 0,
      judge_id: 16,
      link: pLink,
    }
  }

  /**
   *  Parser for Open Kattis, id = 17
   */
  async kattisOJParser(link) {
    const linkURL = new URL(link)
    const pattern = new UrlPattern("/problems/:problemId")

    let result = pattern.match(linkURL.pathname)
    if (!result) throw new Error("Invalid kattis problem link!")

    const { problemId } = result
    /**
     * Extract data from provided link
     */
    const { data } = await lastValueFrom(this.httpService.get(link))
    const $ = cheerio.load(data)

    return {
      name: $(".book-page-heading").text().trim(),
      pid: "KT-" + problemId,
      tags: [],
      difficulty: 0,
      judge_id: 17,
      link: `https://open.kattis.com/problems/${problemId}`,
    }
  }

  /**
   *  Parser for VJUDGE
   */
  async vjudgeParser(link) {
    /**
     * For private vjudge pages
     * We need to make a login request first to get the required cookies
     */
    throw new BadRequestException("Online Judge not supported!")
    // return {
    //   pid: "test",
    //   name: "test",
    //   tags: [],
    //   difficulty: 0,
    //   judge_id: 2,
    //   link,
    // }
  }
}
