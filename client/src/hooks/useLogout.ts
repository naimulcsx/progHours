import { useNavigate } from "react-router-dom"
import clearAuthData from "@/utils/clearAuthData"
import { DEFAULT_TOAST_OPTIONS } from "@/configs/toast-config"
import { useToast } from "@chakra-ui/react"
/**
 * Responsible for logging out an user
 */
const useLogout = () => {
  const navigate = useNavigate()
  const toast = useToast(DEFAULT_TOAST_OPTIONS)
  const handleLogout = async () => {
    /**
     * Clear localstorage data and cookies
     */
    await clearAuthData()
    /**
     * Show success message and redirect to /login
     */
    toast({ status: "success", title: "Logged out!", description: "" })
    navigate("/login")
  }
  return handleLogout
}

export default useLogout
