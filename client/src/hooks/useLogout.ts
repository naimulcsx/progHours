import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import clearAuthData from "@/utils/clearAuthData"

/**
 * Responsible for logging out an user
 */
const useLogout = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    /**
     * Clear localstorage data and cookies
     */
    await clearAuthData()
    /**
     * Show success message and redirect to /login
     */
    toast.success("Logged out", { className: "toast" })
    navigate("/login")
  }
  return handleLogout
}

export default useLogout
