import axios from "axios"

const getAllResources = () => {
  return axios("/api/resources").then((res) => res.data)
}

export { getAllResources }
