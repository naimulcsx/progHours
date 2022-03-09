import axios from "axios"

const getStats = () => {
  return axios.get("/api/users/stats").then((res) => res.data)
}

export { getStats }
