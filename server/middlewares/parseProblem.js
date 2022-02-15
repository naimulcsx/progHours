const cfParser = require("./parsers/cfParser")
const lightOJParser = require("./parsers/lightOjparser")
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

  let parseData
  if (hostname === "codeforces.com") parseData = cfParser
  else if (hostname === "lightoj.com") parseData = lightOJParser
  else if (hostname === "onlinejudge.org") parseData = UVAParser
  else parseData = vjudgeParser

  console.log("body 0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-", req.body)
  // const parseData = hostname === "codeforces.com" ? cfParser : vjudgeParser
  const result = await parseData(req.body)

  console.log("--------------result", result)

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
