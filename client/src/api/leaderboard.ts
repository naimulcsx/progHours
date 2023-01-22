import axios from "axios"

const getRankList = (
  type: "full" | "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth",
  groupSlug?: string
) => {
  const obj = {
    full: "/api/stats",
    currentWeek: "/api/stats?type=currentWeek",
    lastWeek: "/api/stats?type=lastWeek",
    currentMonth: "/api/stats?type=currentMonth",
    lastMonth: "/api/stats?type=lastMonth",
  }
  if (groupSlug)
    obj[type] += type === "full" ? `?groupSlug=${groupSlug}` : `&groupSlug=${groupSlug}`
  return axios.get(obj[type]).then((res) => res.data)
}

const getStatsByUsername = (username: string | undefined) => {
  return axios.get(`/api/stats/${username}`).then((res) => res.data)
}

export { getRankList, getStatsByUsername }
