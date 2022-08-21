import axios from "axios"
const updateProblemInfo = (pid: string, values: any) => {
  return axios.patch(`/api/problems/${pid}`, values).then((res) => res.data)
}

export { updateProblemInfo }
