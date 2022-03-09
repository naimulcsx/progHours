import axios from "axios"

const getRankList = () => {
  return axios.get("/api/users/ranklist").then((res) => res.data)
}

export { getRankList }
