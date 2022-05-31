import * as rp from "request-promise"
import * as UrlPattern from "url-pattern"
import axios from "axios"
import * as cheerio from "cheerio"

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

async function convertVjudgePrivateContestProblemLinkToOriginLink(link) {
  /**
   * For private vjudge contests
   */
  const linkURL = new URL(link.split("#problem").join("")) // ignoring page hash because UrlPattern can't recognize
  // TODO: need to find a better way to match URLS

  const vjudgePattern = new UrlPattern("/contest/:contestId/:problemId")
  let matchedResult = vjudgePattern.match(linkURL.pathname)

  let problemLink: string = link
  if (matchedResult) {
    const loginData = await rp({
      method: "POST",
      uri: "https://vjudge.net/user/login",
      form: {
        username: process.env.VJUDGE_USERNAME,
        password: process.env.VJUDGE_PASSWORD,
      },
      resolveWithFullResponse: true,
    })

    /**
     * Make the cookie string seperated with `; `
     */
    let cookieString: string = ""
    loginData.headers["set-cookie"].forEach((cookie) => {
      cookieString += cookie.split(";")[0] + "; "
    })

    /**
     * Send request to the private page using the cookie
     */
    const { data } = await axios.get(link, {
      headers: {
        Cookie: cookieString,
      },
    })

    // .prob-origin
    let $ = cheerio.load(data)

    if ($("#contest-login-form").length) {
      const contestPassword = linkURL.searchParams.get("pw")
      if (!contestPassword) {
        throw new Error("Password protected contest.")
      } else {
        try {
          const response = await rp({
            method: "POST",
            uri: `https://vjudge.net/contest/login/${matchedResult.contestId}`,
            form: {
              password: contestPassword,
            },
            headers: {
              Cookie: cookieString,
            },
          })
          const contestLoginData = JSON.parse(response)
          if (contestLoginData.error) {
            throw new Error(contestLoginData.error)
          }
          await axios.get(
            `https://vjudge.net/contest/${matchedResult.contestId}`
          )
          const problemPage = await axios.get(link, {
            headers: {
              Cookie: cookieString,
            },
          })
          // console.log(data)
          $ = cheerio.load(problemPage.data)
        } catch (err) {
          // Password is not correct error
          throw new Error(err)
        }
      }
    }

    let found: boolean = false
    $(".prob-num").each(function (i, elm) {
      if (matchedResult.problemId === $(this).text()) {
        found = true
        problemLink = $(this).next().children().attr("href")
      }
    })
    return found ? `https://vjudge.net${problemLink.slice(0, -7)}` : problemLink
  }
  return link
}

async function convertLinkToOriginal(link) {
  link = await convertVjudgePrivateContestProblemLinkToOriginLink(link)
  if (link.includes("CodeForces") || link.includes("Gym"))
    link = vjudgeToCF(link)
  else if (link.includes("LightOJ")) link = vjudgeToLightOJ(link)
  else if (link.includes("AtCoder")) link = vjudgeToAtCoder(link)
  else if (link.includes("CodeChef")) link = vjudgeToCodeChef(link)
  else if (link.includes("SPOJ")) link = vjudgeToSPOJ(link)
  else if (link.includes("Toph")) link = vjudgeTOTOPH(link)
  else if (link.includes("EOlymp")) link = vjudgeToEOlymp(link)
  console.log(link)
  return link
}

export default convertLinkToOriginal
