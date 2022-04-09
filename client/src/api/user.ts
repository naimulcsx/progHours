import axios from "axios"

const getUser = () => {
  return axios.get("/api/auth/user").then((res) => res.data)
}

const updateUserAccount = (values: any) => {
  return axios.patch("/api/users/account", values).then((res) => res.data)
}

export { getUser, updateUserAccount }
