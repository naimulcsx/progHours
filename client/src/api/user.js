import axios from "axios"

const getUser = () => {
  return axios.get("/api/auth/user").then((res) => res.data)
}
export { getUser }
