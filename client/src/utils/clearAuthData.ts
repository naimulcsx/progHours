import axios from "axios"

const clearAuthData = () => {
  /**
   * Remove user data from localStorage
   */
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userId")
  localStorage.removeItem("role")
  localStorage.removeItem("name")
  /**
   * Remove the cookie from browser
   */
  return axios.get("/api/auth/logout")
}

export default clearAuthData
