import axios from "axios"

const createOJHandle = (values: any) => {
  return axios.post("/api/handles", values).then((res) => res.data)
}

const getAllHandles = () => {
  return axios("/api/handles").then((res) => res.data)
}

const deleteHandle = (onlineJudgeId: any) => {
  return axios
    .delete("/api/handles", { data: { onlineJudgeId } })
    .then((res) => res.data)
}

const updateOJHandle = (values: any) => {
  return axios.patch("/api/handles", values).then((res) => res.data)
}

export { createOJHandle, getAllHandles, deleteHandle, updateOJHandle }
