const atCoderParser = require("./parsers/atCoderParser")
const cfParser = require("./parsers/cfParser")
const codeChefParser = require("./parsers/codeChefParser")
const csesParser = require("./parsers/csesParser")
const lightOJParser = require("./parsers/lightOjparser")
const spojParser = require("./parsers/spojParser")
const tophParser = require("./parsers/tophParser")
const UVAParser = require("./parsers/uvaparser")
const vjudgeParser = require("./parsers/vjudgeParser")

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

  let parseData = parserMap[hostname] ? parserMap[hostname] : vjudgeParser
  const result = await parseData(req.body)
  if (result.error) {
    return res.status(400).send({
      status: "error",
      message: result.error,
    })
  }
  req.body = result
  next()
}

module.exports = parseProblem
