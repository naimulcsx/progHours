import axios from "axios"

const getUser = () => {
  return axios.get("/api/users/me").then((res) => res.data)
}

const getUserByUsername = (username: string) => {
  return axios.get(`/api/users/${username}`).then((res) => res.data)
}

const updateUserAccount = (values: any) => {
  return axios.patch("/api/users/me", values).then((res) => res.data)
}

/**********************  ADMIN  ******************** */
const getAllUsers = () => {
  return axios("/api/users").then((res) => res.data)
}

const udpateUserData = (values: any) => {
  return axios.patch("/api/users", values).then((res) => res.data)
}

export {
  getUser,
  updateUserAccount,
  getUserByUsername,
  getAllUsers,
  udpateUserData,
}
