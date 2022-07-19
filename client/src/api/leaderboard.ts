import axios from "axios"

const getRankList = () => {
  return axios.get("/api/stats").then((res) => res.data)
}

const getStatsByUsername = (username: string) => {
  return axios.get(`/api/stats/${username}`).then((res) => res.data)
}

export { getRankList, getStatsByUsername }
