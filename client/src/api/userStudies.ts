import axios from "axios"

const createUserStudy = (values: any) => {
  return axios.post("/api/users/studies", values).then((res) => res.data)
}

const getAllUserStudy = () => {
  return axios("/api/users/me/studies").then((res) => res.data)
}

const getUserStudy = (id: any) => {
  return axios(`/api/users/me/studies/${id}`).then((res) => res.data)
}

const updateUserStudy = (id: any, values: any) => {
  return axios
    .patch(`/api/users/me/studies/${id}`, values)
    .then((res) => res.data)
}

const deleteUserStudy = (id: any) => {
  return axios.delete(`/api/users/me/studies/${id}`).then((res) => res.data)
}

export {
  getAllUserStudy,
  createUserStudy,
  getUserStudy,
  updateUserStudy,
  deleteUserStudy,
}
