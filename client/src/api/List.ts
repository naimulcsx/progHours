// @ts-nocheck
import axios from "axios"

export const updateList = (id, values) => {
  return axios.patch(`/api/lists/${id}`, values).then((res) => res.data)
}

export const deleteList = (id) => {
  return axios.delete(`/api/lists/${id}`).then((res) => res.data)
}
