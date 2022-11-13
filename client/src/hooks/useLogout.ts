import { useNavigate } from "react-router-dom"
import axios from "axios"
import showToast from "~/utils/showToast"

/**
 * Responsible for logging out an user
 */
const useLogout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        navigate("/login")
        showToast("success", "Logged out!")
        localStorage.clear()
      })
      .catch(() => {})
  }
  return handleLogout
}

export default useLogout
