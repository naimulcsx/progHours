import axios from "axios"

const getAllTags = () => {
  return axios("/api/tags").then((res) => res.data)
}

export { getAllTags }
