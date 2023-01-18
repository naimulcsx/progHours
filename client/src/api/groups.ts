import axios from "axios"

export const getGroups = () => {
  return axios.get("/api/groups").then((res) => res.data)
}

export const createGroup = (data: any) => {
  return axios.post("/api/groups", data).then((res) => res.data)
}

export const editGroup = (groupId: any, values: any) => {
  return axios.patch(`/api/groups/${groupId}`, values).then((res) => res.data)
}

export const deleteGroup = (groupId: any) => {
  return axios.delete(`/api/groups/${groupId}`).then((res) => res.data)
}

export const getGroupBySlug = (slug: string = "") => {
  return axios.get(`/api/groups/${slug}`).then((res) => res.data)
}

export const addMember = (groupId: any) => (formData: any) => {
  return axios.post(`/api/groups/${groupId}/members`, formData).then((res) => res.data)
}

export const removeMember = ({ groupId, userId }: any) => {
  return axios.delete(`/api/groups/${groupId}/members/${userId}`).then((res) => res.data)
}

export const joinGroup = (data: any) => {
  return axios.post("/api/groups/join", data).then((res) => res.data)
}
