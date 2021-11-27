import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import clearAuthData from "utils/clearAuthData"

const DashboardHome = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await clearAuthData()
    toast.success("Logged out", { className: "toast" })
    navigate("/login")
  }
  return (
    <div>
      <p>Welcome to secrect page</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardHome
