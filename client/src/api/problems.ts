// @ts-nocheck

import axios from "axios"

const getAllProblems = () => {
  return axios("/api/problems").then((res) => res.data)
}

const getProblemByPid = (pid: string) => {
  return axios(`/api/problems/${pid}`).then((res) => res.data)
}
const getProblemTags = (pid: string) => {
  return axios(`/api/tags`).then((res) => res.data)
}
const updateProblemInfo = (pid: string, values: any) => {
  return axios.patch(`/api/problems/${pid}`, values).then((res) => res.data)
}

export { updateProblemInfo, getProblemByPid, getAllProblems, getProblemTags }
