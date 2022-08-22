import axios from "axios"

const getRankList = (
  type: "full" | "currentWeek" | "lastWeek" | "currentMonth"
) => {
  const obj = {
    full: "/api/stats",
    currentWeek: "/api/stats?type=currentWeek",
    lastWeek: "/api/stats?type=lastWeek",
    currentMonth: "/api/stats?type=currentMonth",
    lastMonth: "/api/stats?type=lastMonth",
  }
  return axios.get(obj[type]).then((res) => res.data)
}

const getStatsByUsername = (username: string) => {
  return axios.get(`/api/stats/${username}`).then((res) => res.data)
}

export { getRankList, getStatsByUsername }
