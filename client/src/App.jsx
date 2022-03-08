import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { toast, ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

// import routes
import routes from "./routes"
import "react-toastify/dist/ReactToastify.css"
import "./styles/fonts.css"
import "./styles/tailwind.css"
import "./styles/spinner.css"
import { useEffect } from "react"
import axios from "axios"
import clearAuthData from "./utils/clearAuthData"

const queryClient = new QueryClient()

function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    async function checkUser() {
      try {
        await axios.get("/api/auth/user")
      } catch (error) {
        await clearAuthData()
        navigate("/login")
        toast.error("Access denied", { className: "toast" })
      }
    }
    const exclude = ["/login", "/register"]
    if (!exclude.includes(pathname)) checkUser()
  }, [])

  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const routing = useRoutes(routes(isLoggedIn))

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div>{routing}</div>
        <ToastContainer
          theme="colored"
          autoClose={2000}
          position="bottom-right"
        />
      </HelmetProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
