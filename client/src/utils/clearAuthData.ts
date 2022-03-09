import axios from "axios"

const clearAuthData = () => {
  // remove data from localStorage
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("role")
  localStorage.removeItem("name")
  localStorage.removeItem("userId")
  // remove the accessToken cookie
  return axios.get("/api/auth/logout")
}

export default clearAuthData
