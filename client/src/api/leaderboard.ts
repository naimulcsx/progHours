import axios from "axios"

const getRankList = () => {
  return axios.get("/api/stats/ranklist").then((res) => res.data)
}

export { getRankList }
