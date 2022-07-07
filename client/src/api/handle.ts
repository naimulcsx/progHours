import axios from "axios"

const createOJHandle = (values: any) => {
  console.log("api----------", values)
  return axios.post("/api/handles", values).then((res) => res.data)
}

const getAllHandles = () => {
  return axios("/api/handles").then((res) => res.data)
}

const deleteHandle = (judge_id: any) => {
  return axios
    .delete("/api/handles", { data: { judge_id } })
    .then((res) => res.data)
}

export { createOJHandle, getAllHandles, deleteHandle }
