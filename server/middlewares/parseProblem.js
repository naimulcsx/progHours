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
  let hostname
  try {
    hostname = new URL(req.body.link).hostname
  } catch (err) {
    return res.status(400).send({
      status: "error",
      message: "Invalid Link",
    })
  }
  const parseData = hostname === "codeforces.com" ? cfParser : vjudgeParser
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
