const cfParser = require("./parsers/cfParser")
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

const parseProblem = async (req, res, next) => {
  const { hostname } = new URL(req.body.link)
  const parseData = hostname === "codeforces.com" ? cfParser : vjudgeParser
  const result = await parseData(req.body)
  req.body = result
  next()
}

module.exports = parseProblem
