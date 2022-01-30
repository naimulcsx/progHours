import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import clearAuthData from "@/utils/clearAuthData"

const useLogout = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await clearAuthData()
    toast.success("Logged out", { className: "toast" })
    navigate("/login")
  }
  return handleLogout
}

export default useLogout
