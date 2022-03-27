import axios from "axios"

const getUser = () => {
  return axios.get("/api/auth/user").then((res) => res.data)
}

const updateUserAccount = (values: any) => {
  return axios.patch("/api/users/account", values).then((res) => res.data)
}

const updatePassword = (values: any) => {
  console.log("fsfsd", values)
  return axios
    .patch("/api/auth/change-password", values)
    .then((res) => res.data)
}

export { getUser, updateUserAccount, updatePassword }
