import axios from "axios"

export const loginMutation = (values: any) => {
  return axios.post("/api/auth/login", values).then((res) => res.data)
}

export const registerMutation = (values: any) => {
  return axios.post("/api/auth/register", values).then((res) => res.data)
}
