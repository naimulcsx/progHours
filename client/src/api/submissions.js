import axios from "axios"

const getSubmissions = () => {
  return axios.get("/api/submissions").then((res) => res.data)
}

export { getSubmissions }
