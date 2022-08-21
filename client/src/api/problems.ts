// @ts-nocheck

import axios from "axios"

const getAllProblems = () => {
  return axios("/api/problems").then((res) => res.data)
}

const getProblemByPid = (pid) => {
  return axios(`/api/problems/${pid}`).then((res) => res.data)
}
const updateProblemInfo = (pid, values) => {
  return axios.patch(`/api/problems/${pid}`, values).then((res) => res.data)
}

export { updateProblemInfo, getProblemByPid, getAllProblems }
