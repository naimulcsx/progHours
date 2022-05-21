import { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"
import { toast, ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "react-query"
import { useLocation, useNavigate, useRoutes } from "react-router-dom"
import clearAuthData from "@/utils/clearAuthData"
import axios from "axios"
import { ReactQueryDevtools } from "react-query/devtools"
import { Toaster } from "react-hot-toast"

/**
 * Import Styles
 */
import "@/styles/fonts.css"
import "@/styles/tailwind.css"
import "@/styles/spinner.css"
import "react-toastify/dist/ReactToastify.css"

/**
 * Import Routes
 */
import routes from "./routes"

/**
 * Import Components
 */
import { GlobalStateProvider } from "./GlobalStateProvider"

/**
 * Initialize query client
 */
const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  /**
   * Check if user has the appropiate cookie to access the private pages
   */
  useEffect(() => {
    async function checkUser() {
      try {
        await axios.get("/api/users/me")
      } catch (err) {
        await clearAuthData()
        navigate("/login")
        toast.error("Access denied", { className: "toast" })
      }
    }
    /**
     * Excluding /login and /register from checking since these are public pages
     */
    if (!["/login", "/register"].includes(pathname)) checkUser()
  }, [])

  const isLoggedIn: boolean = !!localStorage.getItem("isLoggedIn")
  const matchedPage = useRoutes(routes(isLoggedIn))

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className="min-h-screen text-gray-500 bg-gray-50">
          {isLoggedIn ? (
            <GlobalStateProvider>
              <main>{matchedPage}</main>
            </GlobalStateProvider>
          ) : (
            <main>{matchedPage}</main>
          )}
        </div>
        <ToastContainer
          theme="colored"
          autoClose={3000}
          position="bottom-right"
        />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "#4BB543",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
        {/* <ReactQueryDevtools position="bottom-right" /> */}
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
