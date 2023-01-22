import axios from "axios"

const getSubmissions = () => {
  return axios.get("/api/submissions").then((res) => res.data)
}

const getSubmissionsByUsername = (username: string | undefined) => {
  return axios.get(`/api/users/${username}/submissions`).then((res) => res.data)
}

// @ts-ignore
const createSubmission = (values) => {
  return axios.post("/api/submissions", values).then((res) => res.data)
}

// @ts-ignore
const deleteSubmission = (id) => {
  return axios.delete(`/api/submissions/${id}`).then((res) => res.data)
}
// @ts-ignore

const updateSubmission = ({ id, ...values }) => {
  return axios.patch(`/api/submissions/${id}`, values).then((res) => res.data)
}
// @ts-ignore
const addTag = ({ id, ...values }) => {
  return axios.post(`/api/problems/${id}/tags`, values).then((res) => res.data)
}

const fetchActivities = (page = 1) => {
  return axios.get("/api/submissions/activities?page=" + page).then((res) => res.data)
}

export {
  addTag,
  getSubmissions,
  getSubmissionsByUsername,
  createSubmission,
  deleteSubmission,
  updateSubmission,
  fetchActivities,
}
