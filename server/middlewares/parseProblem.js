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
 *    tags (only in cf)
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

const parseProblem = async (req, res, next) => {
  let hostname
  try {
    hostname = new URL(req.body.link).hostname
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "Invalid Link",
    })
  }
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
    req.body.pid = genId()
    req.body.name = genId()
    req.body.tags = []
    req.body.difficulty = 0
  }
  next()
}

module.exports = parseProblem
