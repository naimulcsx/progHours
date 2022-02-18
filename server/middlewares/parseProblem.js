const atCoderParser = require("./parsers/atCoderParser")
const cfParser = require("./parsers/cfParser")
const codeChefParser = require("./parsers/codeChefParser")
const csesParser = require("./parsers/csesParser")
const lightOJParser = require("./parsers/lightOJParser")
const spojParser = require("./parsers/spojParser")
const tophParser = require("./parsers/tophParser")
const UVAParser = require("./parsers/uvaparser")
const vjudgeParser = require("./parsers/vjudgeParser")
const ShortUniqueId = require("short-unique-id")
const genId = new ShortUniqueId({ length: 8 })

/**
 * A parser will return
 *    link
 *    pid (eg. CF-1200A, SPOJ-AGGRCOW etc)
 *    name (name of the problem),
 *    verdict
 *    solveTime
 *    difficulty
 *    tags
 */

const parserMap = {
  "codeforces.com": cfParser,
  "lightoj.com": lightOJParser,
  "onlinejudge.org": UVAParser,
  "cses.fi": csesParser,
  "toph.co": tophParser,
  "spoj.com": spojParser,
  "www.spoj.com": spojParser,
  "atcoder.jp": atCoderParser,
  "www.atcoder.jp": atCoderParser,
  "codechef.com": vjudgeParser,
  "www.codechef.com": vjudgeParser,
}

const { Problem } = require("../models").sequelize.models

const parseProblem = async (req, res, next) => {
  try {
    let hostname = new URL(req.body.link).hostname
    /**
     ** First check if the problem  already exists in the database
     ** Then we don't need to parse it again
     */
    let problem = await Problem.findOne({ where: { link: req.body.link } })
    if (problem) {
      req.body.problemId = problem.dataValues.id
      return next()
    }

    /**
     ** If we have a parser for the hostname we will use its parser
     ** to fetch details about the particular problem from its link
     */
    if (parserMap[hostname]) {
      let parserFn = parserMap[hostname]
      const result = await parserFn(req.body)
      if (result.error) {
        return res.status(400).send({
          status: "error",
          message: result.error,
        })
      }
      result.link = req.body.link
      req.body = result
    } else {
      /**
       ** Otherwise assign a random generated id as `pid` and `name`
       ** with no `tags` and `difficulty` set to 0
       */
      req.body.pid = genId()
      req.body.name = genId()
      req.body.tags = []
      req.body.difficulty = 0
    }
  } catch (err) {
    /**
     *! If the link is invalid
     */
    return res.status(400).send({
      status: "error",
      message: "Invalid Link",
    })
  }
  next()
}

module.exports = parseProblem
