import axios from "axios"

const getSubmissions = () => {
  return axios.get("/api/submissions").then((res) => res.data)
}

const createSubmissions = (values) => {
  return axios.post("/api/submissions", values).then((res) => res.data)
}

const deleteSubmission = (id) => {
  return axios.delete(`/api/submissions/${id}`).then((res) => res.data)
}

export { getSubmissions, createSubmissions, deleteSubmission }
