import axios from "axios"

const getRankList = () => {
  return axios.get("/api/stats").then((res) => res.data)
}

export { getRankList }
