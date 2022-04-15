import axios from "axios"

const getStats = () => {
  return axios.get("/api/stats/me").then((res) => res.data)
}

export { getStats }
