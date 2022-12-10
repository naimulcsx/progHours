// @ts-nocheck

import axios from "axios"

const getUser = () => {
  return axios.get("/api/users/me").then((res) => res.data)
}

const getUserByUsername = (username) => {
  return axios.get(`/api/users/${username}`).then((res) => res.data)
}

const updateUserAccount = (values) => {
  return axios.patch("/api/users/me", values).then((res) => res.data)
}

/**********************  ADMIN  ******************** */
const getAllUsers = () => {
  return axios("/api/users").then((res) => res.data)
}

const udpateUserData = (id, values) => {
  return axios.patch(`/api/users/${id}`, values).then((res) => res.data)
}

export { getUser, updateUserAccount, getUserByUsername, getAllUsers, udpateUserData }
