import axios from "axios"

const getSubmissions = () => {
  return axios.get("/api/submissions").then((res) => res.data)
}

const getSubmissionsByUsername = (username: string) => {
  return axios.get(`/api/submissions/by/${username}`).then((res) => res.data)
}

const createSubmission = (values) => {
  return axios.post("/api/submissions", values).then((res) => res.data)
}

const deleteSubmission = (id) => {
  return axios.delete(`/api/submissions/${id}`).then((res) => res.data)
}

const updateSubmission = ({ id, ...values }) => {
  console.log(values)
  return axios.patch(`/api/submissions/${id}`, values).then((res) => res.data)
}

const addTag = ({ id, ...values }) => {
  return axios.post(`/api/problems/${id}/tags`, values).then((res) => res.data)
}

// const contestLogin = ({ contestId, password }) => {

// }

export {
  addTag,
  getSubmissions,
  getSubmissionsByUsername,
  createSubmission,
  deleteSubmission,
  updateSubmission,
}
