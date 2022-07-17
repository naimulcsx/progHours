/**
 * Get user online judge profile
 */
const getOJProfileURL = (oj: string, handle: string) => {
  switch (oj) {
    case "Codeforces":
      return `https://codeforces.com/profile/${handle}`
    case "Toph":
      return `https://toph.co/u/${handle}`
    case "LightOJ":
      return `https://lightoj.com/user/${handle}`
    case "CodeChef":
      return `https://www.codechef.com/users/${handle}`
    default:
      return ""
  }
}

export default getOJProfileURL
