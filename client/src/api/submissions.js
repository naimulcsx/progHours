import axios from "axios"

const getSubmissions = () => {
  return axios.get("/api/submissions").then((res) => res.data)
}

const createSubmissions = (values) => {
  return axios.post("/api/submissions", values).then((res) => res.data)
}

export { getSubmissions, createSubmissions }
