import { BadRequestException } from "@nestjs/common"
import * as rp from "request-promise"

export default async function getVjudgeCookie() {
  if (!process.env.VJUDGE_USERNAME || !process.env.VJUDGE_PASSWORD) {
    throw new BadRequestException("Missing environment variables!")
  }

  const loginData = await rp({
    method: "POST",
    uri: "https://vjudge.net/user/login",
    form: {
      username: process.env.VJUDGE_USERNAME,
      password: process.env.VJUDGE_PASSWORD,
    },
    resolveWithFullResponse: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
    },
  })

  /**
   * Make the cookie string seperated with `; `
   */
  let cookieString: string = ""
  loginData.headers["set-cookie"].forEach((cookie) => {
    cookieString += cookie.split(";")[0] + "; "
  })
  return cookieString
}
