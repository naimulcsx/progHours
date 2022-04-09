import axios from "axios"

const createOJHandle = (values: any) => {
  return axios.post("/api/handles", values).then((res) => res.data)
}

const getAllHandles = () => {
  return axios("/api/handles").then((res) => res.data)
}

export { createOJHandle, getAllHandles }
