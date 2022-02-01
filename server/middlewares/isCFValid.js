const isValidHttpUrl = require("../utils/isValidHttpUrl")

const getPID = (link) => {
  let pid = "",
    parts = link.split("/")
  if (parts.length !== 7) return -1
  if (parts.includes("contest")) pid = "CF" + "-" + parts[4] + parts[6]
  if (parts.includes("problemset")) pid = "CF" + "-" + parts.slice(-2).join("")
  return pid
}

const isCFValid = (req, res, next) => {
  let { link, verdict, solveTime } = req.body
  let pid = getPID(link)
  if (!isValidHttpUrl(link) || pid === -1)
    return res.status(400).send({
      status: "error",
      message: "Link not valid",
    })
  const verdicts = ["AC", "WA", "TLE", "RTE", "MLE"]
  if (!verdicts.includes(verdict))
    return res.status(400).send({
      status: "error",
      message: "Invalid Verdict",
    })
  req.body.solveTime = parseInt(solveTime)
  req.body.pid = pid
  req.body.judgeId = 1
  next()
}

module.exports = isCFValid
