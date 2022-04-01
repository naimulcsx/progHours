function vjudgeToCF(link) {
  const linkUrl = new URL(link)
  const problem = linkUrl.pathname.includes("CodeForces")
    ? linkUrl.pathname.split("CodeForces-").pop()
    : linkUrl.pathname.split("Gym-").pop()
  const contestId = problem.substring(0, problem.length - 1)
  const problemId = problem.substring(problem.length - 1)
  const newLink = linkUrl.pathname.includes("CodeForces")
    ? `https://codeforces.com/contest/${contestId}/problem/${problemId}`
    : `https://codeforces.com/gym/${contestId}/problem/${problemId}`
  return newLink
}

function vjudgeToLightOJ(link) {
  const problemId = link.split("LightOJ-").pop()
  const newLink = `https://lightoj.com/problem/${problemId}`
  return newLink
}

function vjudgeToAtCoder(link) {
  const problem = link.split("AtCoder-").pop()
  const [contestId, problemId] = problem.split("_")
  return `https://atcoder.jp/contests/${contestId}/tasks/${contestId}_${problemId}`
}

function vjudgeToCodeChef(link) {
  const problemId = link.split("CodeChef-").pop()
  console.log(`https://www.codechef.com/problems/${problemId}`)
  return `https://www.codechef.com/problems/${problemId}`
}

function vjudgeToSPOJ(link) {
  const problemId = link.split("SPOJ-").pop()
  return `https://www.spoj.com/problems/${problemId}`
}

function vjudgeTOTOPH(link) {
  const problemId = link.split("Toph-").pop()
  return `https://toph.co/p/${problemId}`
}

function vjudgeToEOlymp(link) {
  const problemId = link.split("EOlymp-").pop()
  return `https://www.eolymp.com/en/problems/${problemId}`
}

function convertLinkToOriginal(link) {
  if (link.includes("CodeForces") || link.includes("Gym"))
    return vjudgeToCF(link)
  else if (link.includes("LightOJ")) return vjudgeToLightOJ(link)
  else if (link.includes("AtCoder")) return vjudgeToAtCoder(link)
  else if (link.includes("CodeChef")) return vjudgeToCodeChef(link)
  else if (link.includes("SPOJ")) return vjudgeToSPOJ(link)
  else if (link.includes("Toph")) return vjudgeTOTOPH(link)
  else if (link.includes("EOlymp")) return vjudgeToEOlymp(link)
  return link
}

export default convertLinkToOriginal
